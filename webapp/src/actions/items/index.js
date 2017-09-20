import { getAPI, get } from '../../http';

const insert = (array, start, end, item) => {
  if (end < 0) {
    return [item];
  }

  if (start === end) {
    return [...array.slice(0, end + 1), item, ...array.slice(end + 1, array.length)];
  }

  let idx = Math.floor((start + end) / 2);
  if (array[idx].date < item.date) {
    return insert(array, Math.min(end, idx + 1), end, item);
  } else {
    return insert(array, start, Math.max(start, idx - 1), item);
  }
}

export const fetchPages = (bookId) => (dispatch) => {
  get(getAPI("page/list")(bookId)).then(response => {

    let array = [];
    response.forEach(res => {
      let related = res.DiaryPageRelated.split('|').filter(r => r);

      array = insert(array, 0, array.length - 1, {
        date: res.DiaryPageStartDate,
        fetchId: res.DiaryPageId,
        title: res.DiaryPageTitle,
        milestone: null,
        related
      });

      array = insert(array, 0, array.length - 1, {
        date: res.DiaryPageEndDate,
        fetchId: null,
        secondFetchId: res.DiaryPageId,
        title: res.DiaryPageTitle,
        milestone: null,
        related
      });

      if (!res.DiaryMilestones) {
        return;
      }

      res.DiaryMilestones.forEach(milestone => {
        array = insert(array, 0, array.length - 1, {
          date: milestone.DiaryMilestoneDate,
          fetchId: null,
          secondFetchId: res.DiaryPageId,
          title: res.DiaryPageTitle,
          milestone: milestone.DiaryMilestoneTitle,
          related: []
        });
      });

    });

    dispatch({
      type: 'ITEMS_GENERATED',
      array
    });
    dispatch({
      type: 'ITEM_IDX_RESET',
      idx: -1
    });
    dispatch({
      type: "RESET_MATTER_ITEM"
    });
    dispatch({
      type: "RESET_MATTER_PEAPLE"
    });

    dispatch({
      type: "BOOK_SELECTOR_SHOW",
      show: false
    });

  }, reason => {
    alert(reason);
  });
}

export const fetchPage = (pageId, cb) => (dispatch) => {
  get(getAPI("page/get")(pageId)).then(response => {
    dispatch({
      type: "DETAIL_FETCH_SUCCESS",
      response
    });
    if (typeof cb === "function") cb();
  }, reason => {
    alert(reason);
  });
}

export const showItemSelector = (show) => (dispatch) => {
  dispatch({
    type: "ITEM_SELECTOR_SHOW",
    show
  });
}

export const nextItem = () => (dispatch) => {
  dispatch({
    type: "ITEM_IDX_INCREMENT"
  });
}
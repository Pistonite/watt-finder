$(document).ready(() => {
  LANG.setupLanguage();
  $("div#language_select_div").append(LANG.$makeLanguageSelector());

  $("#title").text(LANG.localize("title"));
  $("head").children("title").text(LANG.localize("title"));
  $("#title_initial").text(LANG.localize("title_initial"));
  $("#title_search_ball").text(LANG.localize("title_search_ball"));
  $("#title_search_tr").text(LANG.localize("title_search_tr"));
  $("#title_search_result").text(LANG.localize("title_search_result"));

  const $ballFirst = DOM_OBJ.$createBallSelector();
  const $trFirst = DOM_OBJ.$createTRSelector();
  $("div#initial")
    .append($ballFirst)
    .append("&nbsp;")
    .append($trFirst)
    .append("&nbsp;")
    .append(DOM_OBJ.$createCheck1stButton(() => $ballFirst, () => $trFirst, () => $("#check_first_day_display")));

  const $ballSearch = DOM_OBJ.$createBallSelector();
  $("div#search_ball")
    .append($ballSearch)
    .append("&nbsp;")
    .append(DOM_OBJ.$createSearchBallButton(() => $ballFirst, () => $trFirst, () => $ballSearch, () => $("#search_result_display")));

  const $trSearch = DOM_OBJ.$createTRSelector();
  $("div#search_tr")
    .append($trSearch)
    .append("&nbsp;")
    .append(DOM_OBJ.$createSearchTRButton(() => $ballFirst, () => $trFirst, () => $trSearch, () => $("#search_result_display")));

  $("div#redo").append(DOM_OBJ.$createRedoButton(() => $ballFirst, () => $trFirst));
});
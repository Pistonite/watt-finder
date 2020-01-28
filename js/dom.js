const DOM_OBJ = {};

DOM_OBJ.$createBallSelector = () => {
  const $s = $("<div>").addClass("ball_selector").attr("ball_id", 0)
    .append(
      $("<img>").addClass("ball_image")
    ).append(
      $("<span>").addClass("ball_desc")
    ).click(event => {
      let $elem = $(event.target || event.srcElement);
      while (!$elem.attr("ball_id")) {
        $elem = $elem.parent();//Choose the outer div
      }
      const id = (parseInt($elem.attr("ball_id")) + 1) % DATA.ballCount;
      $elem.attr("ball_id", id);
      updateBallSelector($elem);
    });
  updateBallSelector($s);
  return $s;
};

const updateBallSelector = $ballSelector => {
  const id = parseInt($ballSelector.attr("ball_id"));
  $ballSelector.children("img.ball_image").attr("src", "img/" + DATA.balls[id].name + ".png");
  $ballSelector.children("span.ball_desc").text(LANG.localize(DATA.balls[id].name) + ` (${DATA.balls[id].price}W)`);
};

DOM_OBJ.$createTRSelector = () => {
  const $s = $("<div>").addClass("tr_selector").attr("tr_id", -1)
    .append(
      $("<img>").addClass("tr_image")
    ).append(
      $("<span>").addClass("tr_desc")
    );
  const $i = $("<input>").attr("type", "text").attr("placeholder", LANG.localize("tr_search"));
  $i.on("input", () => {
    const search = $i.val();
    if (search) {
      for (let i = 0; i < DATA.trCount; i++) {
        const name = LANG.localize(`tr_${i}_name`);
        if (name.toLowerCase().startsWith(search)) {
          $s.attr("tr_id", i);
          updateTRSelector($s);
          return;
        }
      }
      for (let i = 0; i < DATA.trCount; i++) {
        const name = LANG.localize(`tr_${i}_name`);
        if (name.toLowerCase().indexOf(search) > 0) {
          $s.attr("tr_id", i);
          updateTRSelector($s);
          return;
        }
      }
    }
    $s.attr("tr_id", -1);
    updateTRSelector($s);
  });
  updateTRSelector($s);
  return $("<div>").append($i).append($s).addClass("tr_selector_group");
};

const updateTRSelector = $TRSelector => {
  const id = parseInt($TRSelector.attr("tr_id"));
  let img, desc;
  if (id < 0) {
    img = `img/tr_${DATA.trs[0].type}.png`;
    desc = LANG.localize("tr_unknown");
  } else {
    img = `img/tr_${DATA.trs[id].type}.png`;
    desc = LANG.localize(`tr_${id}_name`) + ` (${DATA.trs[id].price}W)`;
  }
  $TRSelector.children("img.tr_image").attr("src", img);
  $TRSelector.children("span.tr_desc").text(desc);
};

DOM_OBJ.$createCheck1stButton = ($$ball, $$tr, $$display) => {
  return $("<input>").attr("type", "button").val(LANG.localize("check_first_day"))
    .click(() => {
      const ballID = parseInt($$ball().attr("ball_id"));
      const trID = parseInt($$tr().children("div.tr_selector").attr("tr_id"));
      if (CALC.check1stFrame(ballID, trID) >= 0) {
        $$display().text(LANG.localize("check_first_day_ok")).removeClass("bad_message");
      } else {
        $$display().text(LANG.localize("check_first_day_no_good")).addClass("bad_message");
      }
    });
};

DOM_OBJ.$createSearchBallButton = ($$ballStart, $$trStart, $$ballTarget, $$display) => {
  return $("<input>").attr("type", "button").val(LANG.localize("search_ball_button"))
    .click(() => {
      const ballStartID = parseInt($$ballStart().attr("ball_id"));
      const trStartID = parseInt($$trStart().children("div.tr_selector").attr("tr_id"));
      const ballTargetID = parseInt($$ballTarget().attr("ball_id"));
      CALC.searchBall(ballStartID, trStartID, ballTargetID, (day, frame) => {
        displaySearchResult(day, frame, $$display);
      });
    });
};

DOM_OBJ.$createSearchTRButton = ($$ballStart, $$trStart, $$trTarget, $$display) => {
  return $("<input>").attr("type", "button").val(LANG.localize("search_tr_button"))
    .click(() => {
      const ballStartID = parseInt($$ballStart().attr("ball_id"));
      const trStartID = parseInt($$trStart().children("div.tr_selector").attr("tr_id"));
      const trTargetID = parseInt($$trTarget().children("div.tr_selector").attr("tr_id"));
      CALC.searchTR(ballStartID, trStartID, trTargetID, (day, frame) => {
        displaySearchResult(day, frame, $$display);
      });
    });
};

let RESULT_FRAME;
const displaySearchResult = (day, frame, $$display) => {
  if (day >= 0) {
    RESULT_FRAME = frame;
    $$display().empty()
      .append($("<p>").text(LANG.localize("days") + day));
    $$display().append($ballDisplay(frame[0]));
    for (let i = 1; i < frame.length; i++) {
      $$display().append("&nbsp;").append($trDisplay(frame[i]));
    }
  } else {
    $$display().empty().text(LANG.localize("not_found"));
  }
};

const $ballDisplay = (id) => {
  const $s = $("<div>").addClass("ball_selector").attr("ball_id", id)
    .append(
      $("<img>").addClass("ball_image")
    ).append(
      $("<span>").addClass("ball_desc")
    );
  updateBallSelector($s);
  return $s;
};

const $trDisplay = (id) => {
  const $s = $("<div>").addClass("tr_display").attr("tr_id", id)
    .append(
      $("<img>").addClass("tr_image")
    ).append(
      $("<span>").addClass("tr_desc")
    );
  updateTRSelector($s);
  return $s;
};

DOM_OBJ.$createRedoButton = ($$ball, $$tr) => {
  return $("<input>").attr("type", "button").val(LANG.localize("redo_button"))
    .click(() => {
      if (!RESULT_FRAME) return;
      const ballid = RESULT_FRAME[0];
      $$ball().attr("ball_id", ballid);
      const trid = RESULT_FRAME[1];
      $$tr().children("div.tr_selector").attr("tr_id", trid);
      $$tr().children("input").val(LANG.localize(`tr_${trid}_name`));
      updateBallSelector($$ball());
      updateTRSelector($$tr().children("div.tr_selector"));
    });
};
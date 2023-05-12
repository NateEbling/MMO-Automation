// Note that this code was imported from the Google Apps Script editor, so it will not be functional outside of that environment

function onEdit(e) {

  // All the possible event triggers    
    if(e.range.getA1Notation() == "G13") { // M & solo exotic event
      
      let ss = SpreadsheetApp.getActiveSheet().getName();

      // Conditional to determine which sheet is being used
      if(ss == "Salvaging") {

        mExotics();

      }

      else if(ss == "Solo") {

        soloExotics();

      }      
    }
    
    else if(e.range.getA1Notation() == "Q13") { // N exotic event
      
      let ss = SpreadsheetApp.getActiveSheet().getName();

      if(ss == "Salvaging") {
        nExotics();
      }
    }
  
}

  function completeOrder() { // Function that is activated when clicking the green "complete order" button on the SALVAGING sheet

    let ui = SpreadsheetApp.getUi();
    let response = ui.alert("Complete Order", "Would you like to complete this order? (All the data will be logged)", ui.ButtonSet.YES_NO);

    if(response === ui.Button.YES) {

      // Resetting the 'complete order button' and updating the order number on the sheet
      let ss = SpreadsheetApp.getActiveSpreadsheet();
      let data = ss.getSheetByName("Salvaging");
  
      let orderNum = data.getRange("J3"); 

      let num = orderNum.getValue();
      orderNum.setValue(num + 1);

      addNewLine(num);

      mLog(); 
      nLog();
      resetSheet();

    }

    else {

      return;

    }
  }

  function clearSheetNoSave() { // Function that is activated when clicking the red "clear sheet" button on the SALVAGING sheet

    let ui = SpreadsheetApp.getUi();
    let response = ui.alert("Clear Sheet", "Would you like to clear the sheet? (None of the data will be logged)", ui.ButtonSet.YES_NO);

    if(response === ui.Button.YES) {

      resetSheet();

    }

    else {

      return;

    }
  }

  function completeSolo() { // Function that is activated when clicking the green "complete order" button on the SOLO SALVAGING sheet

    let ui = SpreadsheetApp.getUi();
    let response = ui.alert("Complete Order", "Would you like to complete this order? (All the data will be logged)", ui.ButtonSet.YES_NO);

    if(response === ui.Button.YES) {

      let ss = SpreadsheetApp.getActiveSpreadsheet();
      let data = ss.getSheetByName("Solo");
  
      let orderNum = data.getRange("J3"); 
      let num = orderNum.getValue();
      orderNum.setValue(num + 1);

      addNewLine(num);

      soloLog();
      resetSolo();

    }

    else {

      return;

    }
  }

  function clearSolo() { // Function that is activated when clicking the red "clear sheet" button on the SOLO SALVAGING sheet

    let ui = SpreadsheetApp.getUi();
    let response = ui.alert("Clear Sheet", "Would you like to clear the sheet? (None of the data will be logged)", ui.ButtonSet.YES_NO);

    if(response === ui.Button.YES) {

      resetSolo();

    }

    else {

      return;
      
    }
  }

  function soloExotics() {

    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let data = ss.getSheetByName("Solo");
    let exoticInput = data.getRange("G13"); 
    let exoticVal = exoticInput.getValue();

    if(!isNaN(exoticVal)) {
    
      let exoticSum = exoticInput.offset(3, 1); 
      exoticSum.setValue((Number(exoticVal) * 0.85) + Number(exoticSum.getValue()));
      exoticInput.clearContent();
    
      let exoticCount = data.getRange("H15"); 
      let index = exoticCount.getValue();
      let counter = exoticInput.offset(2, 1); 
      counter.setValue(Number(index) + 1);

      data.setCurrentCell(exoticInput);

      return;

    }

    else {

      let ui = SpreadsheetApp.getUi();
      ui.alert("Oops! That wasn't a number!");
      exoticInput.clearContent();
      
      data.setCurrentCell(exoticInput);

      return;

    }

  }
  
  function mExotics() {
    
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let data = ss.getSheetByName("Salvaging");
    let exoticInput = data.getRange("G13"); 
    let exoticVal = exoticInput.getValue();

    if(!isNaN(exoticVal)) {
    
      let exoticSum = exoticInput.offset(3, 1); 
      exoticSum.setValue((Number(exoticVal) * 0.85) + Number(exoticSum.getValue()));
      exoticInput.clearContent();
    
      let exoticCount = data.getRange("H15"); 
      let index = exoticCount.getValue();
      let counter = exoticInput.offset(2, 1); 
      counter.setValue(Number(index) + 1);

      data.setCurrentCell(exoticInput);

      return;

    }

    else {

      let ui = SpreadsheetApp.getUi();
      ui.alert("Hmm, I don't think that one was a number!");
      exoticInput.clearContent();
      
      data.setCurrentCell(exoticInput);

      return;

    }
    
  }
  
  function nExotics() {
    
    let ss = SpreadsheetApp.getActiveSpreadsheet(); 
    let data = ss.getSheetByName("Salvaging");
    let exoticInput = data.getRange("Q13"); 
    let exoticVal = exoticInput.getValue();

    if(!isNaN(exoticVal)) {
    
      let exoticSum = exoticInput.offset(3, 1); 
      exoticSum.setValue((Number(exoticVal) * 0.85) + Number(exoticSum.getValue()));
      exoticInput.clearContent();
    
      let exoticCount = data.getRange("R15"); 
      let index = exoticCount.getValue();
      let counter = exoticInput.offset(2, 1); 
      counter.setValue(Number(index) + 1);
    
      data.setCurrentCell(exoticInput);

      return;

    }

    else {

      let ui = SpreadsheetApp.getUi();
      ui.alert("Try again!");
      exoticInput.clearContent();

      data.setCurrentCell(exoticInput);

      return;

    }
    
  }
  
  function mLog() {
    
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let data = ss.getSheetByName("Salvaging");
    
    ///// M'S LOGGING /////
    
    // gear info (7)
    M_gearNum = data.getRange("G4").getValues(); 
    M_gearPrice = data.getRange("G5").getValues(); 
    M_salvageCost = data.getRange("G6").getValues();  
    M_gSpent = data.getRange("G7").getValues(); 
    M_gBack = data.getRange("G8").getValues(); 
    M_profit = data.getRange("G9").getValues(); 
    M_roi = data.getRange("G10").getValues();
    
    // craftables quantities (16)
    M_ancient_q = data.getRange("D3").getValues();
    M_ori_q = data.getRange("D4").getValues();
    M_thick_q = data.getRange("D5").getValues();
    M_elder_q = data.getRange("D6").getValues();
    M_mithril_q = data.getRange("D7").getValues();
    M_lucent_q = data.getRange("D8").getValues();
    M_goss_q = data.getRange("D9").getValues();
    M_hard_q = data.getRange("D10").getValues();
    M_silk_q = data.getRange("D11").getValues();

    M_ecto_q = data.getRange("B22").getValues();
    M_control_q = data.getRange("B23").getValues();
    M_enh_q = data.getRange("B24").getValues();
    M_pain_q = data.getRange("B25").getValues();
    M_brill_q = data.getRange("B26").getValues();
    M_pot_q = data.getRange("B27").getValues();
    M_skill_q = data.getRange("B28").getValues();

    // profits (16)
    M_ancient_p = data.getRange("F13").getValues();
    M_ori_p = data.getRange("F14").getValues();
    M_thick_p = data.getRange("F15").getValues();
    M_elder_p = data.getRange("F16").getValues();
    M_mithril_p = data.getRange("F17").getValues();
    M_lucent_p = data.getRange("F18").getValues();
    M_goss_p = data.getRange("F19").getValues();
    M_hard_p = data.getRange("F20").getValues();
    M_silk_p = data.getRange("F21").getValues();

    M_ecto_p = data.getRange("F22").getValues();
    M_control_p = data.getRange("F23").getValues();
    M_enh_p = data.getRange("F24").getValues();
    M_pain_p = data.getRange("F25").getValues();
    M_brill_p = data.getRange("F26").getValues();
    M_pot_p = data.getRange("F27").getValues();
    M_skill_p = data.getRange("F28").getValues();
    
    // exotics quantity (1)
    M_exo_q = data.getRange("H15").getValues(); 
    
    // exotics profit (1)
    M_exo_p = data.getRange("H16").getValues(); 
    
    // Data array for all the values being logged
    let info = [
      [
        "M",
        M_gearNum, M_gearPrice, M_salvageCost, M_gSpent, M_gBack, M_profit, M_roi,
        M_ancient_q, M_ancient_p, M_ori_q, M_ori_p, M_thick_q, M_thick_p,
        M_elder_q, M_elder_p, M_mithril_q, M_mithril_p, M_lucent_q, M_lucent_p,
        M_goss_q, M_goss_p, M_hard_q, M_hard_p, M_silk_q, M_silk_p,
        M_ecto_q, M_ecto_p, M_control_q, M_control_p, M_enh_q, M_enh_p,
        M_pain_q, M_pain_p, M_brill_q, M_brill_p, M_pot_q, M_pot_p, M_skill_q, M_skill_p,
        M_exo_q, M_exo_p
      ]
    ]; 
  
    let L = 42; // number of variables in info array
  
    mLogValues(info, L); // go log all the values
    
    ///// END OF M'S LOGGING /////
    
    return;
    
  }
      
  function nLog() {
      
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let data = ss.getSheetByName("Salvaging");
    
    ///// N'S LOGGING /////
 
    // gear info (7)
    N_gearNum = data.getRange("Q4").getValues(); 
    N_gearPrice = data.getRange("Q5").getValues(); 
    N_salvageCost = data.getRange("Q6").getValues();  
    N_gSpent = data.getRange("Q7").getValues(); 
    N_gBack = data.getRange("Q8").getValues(); 
    N_profit = data.getRange("Q9").getValues(); 
    N_roi = data.getRange("Q10").getValues();
    
    // craftables quantities (16)
    N_ancient_q = data.getRange("N3").getValues();
    N_ori_q = data.getRange("N4").getValues();
    N_thick_q = data.getRange("N5").getValues();
    N_elder_q = data.getRange("N6").getValues();
    N_mithril_q = data.getRange("N7").getValues();
    N_lucent_q = data.getRange("N8").getValues();
    N_goss_q = data.getRange("N9").getValues();
    N_hard_q = data.getRange("N10").getValues();
    N_silk_q = data.getRange("N11").getValues();
 
    N_ecto_q = data.getRange("L22").getValues();
    N_control_q = data.getRange("L23").getValues();
    N_enh_q = data.getRange("L24").getValues();
    N_pain_q = data.getRange("L25").getValues();
    N_brill_q = data.getRange("L26").getValues();
    N_pot_q = data.getRange("L27").getValues();
    N_skill_q = data.getRange("L28").getValues();
 
    // profits (16)
    N_ancient_p = data.getRange("P13").getValues();
    N_ori_p = data.getRange("P14").getValues();
    N_thick_p = data.getRange("P15").getValues();
    N_elder_p = data.getRange("P16").getValues();
    N_mithril_p = data.getRange("P17").getValues();
    N_lucent_p = data.getRange("P18").getValues();
    N_goss_p = data.getRange("P19").getValues();
    N_hard_p = data.getRange("P20").getValues();
    N_silk_p = data.getRange("P21").getValues();
 
    N_ecto_p = data.getRange("P22").getValues();
    N_control_p = data.getRange("P23").getValues();
    N_enh_p = data.getRange("P24").getValues();
    N_pain_p = data.getRange("P25").getValues();
    N_brill_p = data.getRange("P26").getValues();
    N_pot_p = data.getRange("P27").getValues();
    N_skill_p = data.getRange("P28").getValues();
    
    // exotics quantity (1)
    N_exo_q = data.getRange("R15").getValues(); 
    
    // exotics profit (1)
    N_exo_p = data.getRange("R16").getValues(); 
    
    // Data array for all the values being logged
    let info = [
      [
        "N",
        N_gearNum, N_gearPrice, N_salvageCost, N_gSpent, N_gBack, N_profit, N_roi,
        N_ancient_q, N_ancient_p, N_ori_q, N_ori_p, N_thick_q, N_thick_p,
        N_elder_q, N_elder_p, N_mithril_q, N_mithril_p, N_lucent_q, N_lucent_p,
        N_goss_q, N_goss_p, N_hard_q, N_hard_p, N_silk_q, N_silk_p,
        N_ecto_q, N_ecto_p, N_control_q, N_control_p, N_enh_q, N_enh_p,
        N_pain_q, N_pain_p, N_brill_q, N_brill_p, N_pot_q, N_pot_p, N_skill_q, N_skill_p,
        N_exo_q, N_exo_p
      ]
    ]; 
  
    let L = 42; // number of variables in info array
    
    nLogValues(info, L); // go log all the values
    
    ///// END OF N'S LOGGING /////
    
    return;
    
  }

  function soloLog() {

    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let dataSolo = ss.getSheetByName("Solo");
    
    letter = dataSolo.getRange("J11").getValues();

    // gear info (7)
    gearNum = dataSolo.getRange("G4").getValues(); 
    gearPrice = dataSolo.getRange("G5").getValues(); 
    salvageCost = dataSolo.getRange("G6").getValues();  
    gSpent = dataSolo.getRange("G7").getValues(); 
    gBack = dataSolo.getRange("G8").getValues(); 
    profit = dataSolo.getRange("G9").getValues(); 
    roi = dataSolo.getRange("G10").getValues();
    
    // craftables quantities (16)
    ancient_q = dataSolo.getRange("D3").getValues();
    ori_q = dataSolo.getRange("D4").getValues();
    thick_q = dataSolo.getRange("D5").getValues();
    elder_q = dataSolo.getRange("D6").getValues();
    mithril_q = dataSolo.getRange("D7").getValues();
    lucent_q = dataSolo.getRange("D8").getValues();
    goss_q = dataSolo.getRange("D9").getValues();
    hard_q = dataSolo.getRange("D10").getValues();
    silk_q = dataSolo.getRange("D11").getValues();

    ecto_q = dataSolo.getRange("B22").getValues();
    control_q = dataSolo.getRange("B23").getValues();
    enh_q = dataSolo.getRange("B24").getValues();
    pain_q = dataSolo.getRange("B25").getValues();
    brill_q = dataSolo.getRange("B26").getValues();
    pot_q = dataSolo.getRange("B27").getValues();
    skill_q = dataSolo.getRange("B28").getValues();

    // profits (16)
    ancient_p = dataSolo.getRange("F13").getValues();
    ori_p = dataSolo.getRange("F14").getValues();
    thick_p = dataSolo.getRange("F15").getValues();
    elder_p = dataSolo.getRange("F16").getValues();
    mithril_p = dataSolo.getRange("F17").getValues();
    lucent_p = dataSolo.getRange("F18").getValues();
    goss_p = dataSolo.getRange("F19").getValues();
    hard_p = dataSolo.getRange("F20").getValues();
    silk_p = dataSolo.getRange("F21").getValues();

    ecto_p = dataSolo.getRange("F22").getValues();
    control_p = dataSolo.getRange("F23").getValues();
    enh_p = dataSolo.getRange("F24").getValues();
    pain_p = dataSolo.getRange("F25").getValues();
    brill_p = dataSolo.getRange("F26").getValues();
    pot_p = dataSolo.getRange("F27").getValues();
    skill_p = dataSolo.getRange("F28").getValues();
    
    // exotics quantity (1)
    exo_q = dataSolo.getRange("H15").getValues(); 
    
    // exotics profit (1)
    exo_p = dataSolo.getRange("H16").getValues(); 
    
    // Data array for all the values being logged
    let infoSolo = [
      [
        letter,
        gearNum, gearPrice, salvageCost, gSpent, gBack, profit, roi,
        ancient_q, ancient_p, ori_q, ori_p, thick_q, thick_p,
        elder_q, elder_p, mithril_q, mithril_p, lucent_q, lucent_p,
        goss_q, goss_p, hard_q, hard_p, silk_q, silk_p,
        ecto_q, ecto_p, control_q, control_p, enh_q, enh_p,
        pain_q, pain_p, brill_q, brill_p, pot_q, pot_p, skill_q, skill_p,
        exo_q, exo_p
      ]
    ]; 
  
    let L = 42; // number of variables in info array
    
    mLogValues(infoSolo, L);

    //soloLogValues(infoSolo, L); // go log all the values
    
    return;
  }
      
  function resetSheet() {
    
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let data = ss.getSheetByName("Salvaging");
    
    // clearing gear info section
    data.getRange("J5").clearContent();
    data.getRange("J7").clearContent();
    data.getRange("J9").clearContent();

    // clearing exotic costs and # sold values
    data.getRange("H15:H16").clearContent(); 
    data.getRange("R15:R16").clearContent(); 
    
    // clearing craftable item quantities
    data.getRange("B3:C11").clearContent(); 
    data.getRange("L3:M11").clearContent(); 

    // clearing craftable sell prices
    data.getRange("C13:C21").clearContent();
    data.getRange("E13:E21").clearContent();
    data.getRange("M13:M21").clearContent();
    data.getRange("O13:O21").clearContent();
    
    // clearing non-craftable item quantities & sell prices
    data.getRange("B22:E28").clearContent(); 
    data.getRange("L22:O28").clearContent();

    return;
    
  }

  function resetSolo() {

    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let data = ss.getSheetByName("Solo");

    // clearing gear info section
    data.getRange("J5").clearContent();
    data.getRange("J7").clearContent();
    //data.getRange("J9").clearContent();
    
    // clearing exotic costs and # sold values
    data.getRange("H15:H16").clearContent(); 

    // clearing craftable item quantities
    data.getRange("B3:C11").clearContent(); 

    // clearing craftable sell prices
    data.getRange("C13:C21").clearContent();
    data.getRange("E13:E21").clearContent();

    // clearing non-craftable item quantities & sell prices
    data.getRange("B22:E28").clearContent(); 

    return;

  }
  
  function mLogValues(V, L) {
    
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let log = ss.getSheetByName("Logs");
    
    log.getRange(3, 2, 1, L).setFontWeight("normal").setValues(V);
   
    return;
    
  }
       
  function nLogValues(V, L) {
    
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let log = ss.getSheetByName("Logs");
    
    log.getRange(4, 2, 1, L).setFontWeight("normal").setValues(V);
    
    return;
    
  }

  function soloLogValues(V, L) {

    // Conditional to place the solo salvaging in the correct order for the logs and totals calculations that happen within the sheet
    if(V[0] == "M") {

      let ss = SpreadsheetApp.getActiveSpreadsheet();
      let log = ss.getSheetByName("Logs");

      log.getRange(2, 2, 1, L).setFontWeight("normal").setValues(V);

      V2 = [ // empty array to fill the unused row with "0"'s
        [
          "N", 
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0"
        ]
      ];

      log.getRange(3, 2, 1, L).setValues(V2); // setting the unused row to 0

    }

    else if(V[0] == "N") {

      let ss = SpreadsheetApp.getActiveSpreadsheet();
      let log = ss.getSheetByName("Logs");

      V2 = [ // empty array to fill the unused row with "0"'s
        [
          "M",
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
          "0", "0"
        ]
      ];

      log.getRange(2, 2, 1, L).setValues(V2);
    
      log.getRange(3, 2, 1, L).setFontWeight("normal").setValues(V);

    }

    return;

  }

  function addNewLine(order_num) {

    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let log = ss.getSheetByName("Logs");
    
    log.insertRowAfter(2);
    log.insertRowAfter(2);

    log.getRange("A3:A4").merge().setFontSize("10").setFontWeight("normal").setValue(order_num);

    return;
    
  }

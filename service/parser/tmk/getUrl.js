const translit = require("../../translit")


module.exports = function getUrl(j) {

    let url = translit(j.title)

    switch(j.id) {
        // Электроинструмент
        case 257: url = "otreznye-mashiny"; break
        case 4: url = "akkumulyatornyy-instrument_dreli"; break
        case 5: case 496: case 557: case 598: case 599: case 600: case 601: url = "shurupoverty"; break
        case 6: url = "otvertki"; break
        case 8: url = "gaykoverty"; break
        case 9: url = "pnevmoinstrument_gaykoverty"; break
        case 10: case 493: url = "setevoy-instrument_gaykoverty"; break
        case 12: url = "cirkulyarnye-pily"; break
        case 13: case 14: case 15: case 16: case 17: case 576: url = "setevoy-instrument_cirkulyarnye-pily"; break
        case 18: url = "dreli"; break
        case 20: url = "lobziki"; break
        case 21: case 22: case 562: url = "setevoy-instrument_lobziki"; break
        case 23: url = "ruchnoy-instrument_nozhnicy"; break
        case 25: url = "setevoy-instrument_otboynye-molotki"; break
        case 26: case 27: url = "setevoy-instrument_perforatory"; break
        case 28: url = "setevoy-instrument_rubanki"; break
        case 29: url = "setevoy-instrument_sabelnye-pily"; break
        case 31: url = "dreli"; break
        case 32: url = "setevoy-instrument_shurupoverty"; break
        case 536: url = "setevoy-instrument_miksery"; break
        case 537: case 558: url = "dreli"; break
        case 33: url = "setevoy-instrument_feny"; break
        case 580: case 581: case 582: url = "frezery"; break
        case 36: url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
        case 37: url = "setevoy-instrument_ugloshlifovalnye-mashiny"; break
        case 38: url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
        case 39: url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
        case 40: url = "setevoy-instrument_polirovalnye-mashiny"; break
        case 41: case 42: case 43: case 572: case 577: url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
        case 484: url = "kraskopulty"; break
        case 554: url = "setevoy-instrument_drugoe"; break
        case 591: url = "setevoy-instrument_zaklepochniki"; break
        case 592: url = "setevoy-instrument_steplery"; break
        case 594: case 595: url = "setevoy-instrument_kleevye-pistolety"; break
        case 596: url = "setevoy-instrument_drugoe"; break
        // Измерительная техника
        case 53: url = "drugaya-izmeritelnaya-tehnika"; break
        case 54: url = "rotacionnye-urovni"; break
        case 55: url = "uglomery-i-uklonomery"; break
        // Малая строительная техника
        case 494: url = "motopompy"; break
        case 495: url = "motopompy"; break
        case 485: url = "benzoinstrument_otreznye-mashiny"; break
        case 486: url = "setevoy-instrument_otreznye-mashiny"; break
        case 66: url = "stenoreznye-mashiny"; break
        // Пневмоинструмент
        case 68: url = "pnevmoinstrument_dreli"; break
        case 69: url = "pnevmoinstrument_zaklepochniki"; break
        case 71: url = "gvozdezabivateli-steplery"; break
        case 73: url = "pnevmoinstrument_pryamoshlifovalnye-mashiny"; break
        case 74: url = "pnevmoinstrument_otboynye-molotki"; break
        case 76: url = "gvozdezabivateli-steplery"; break
        case 77: url = "pnevmoinstrument_kraskopulty"; break
        case 78: url = "gvozdezabivateli-steplery"; break
        case 79: url = "pnevmoinstrument_shurupoverty"; break
        case 555: url = "pnevmoinstrument_gaykoverty"; break
        // Расходные материалы и оснастка
        case 742: url = "dlya-neylerov-i-steplerov"; break
        case 744: url = "dlya-pnevmokraskopultov"; break
        case 745: url = "dlya-pnevmokraskopultov"; break
        case 749: url = "prochaya-osnastka"; break
        case 767: url = "rashodnye-materialy"; break
        case 771: url = "prochie-aksessuary"; break
        case 772: url = "rashodnye-materialy"; break
        case 773: url = "rashodnye-materialy"; break
        case 136: url = "sredstva-zaschity"; break
        case 759: url = "patrony-i-klyuchi"; break
        case 760: url = "patrony-i-klyuchi"; break
        case 501: url = "akkumulyatory"; break
        case 590: url = "akkumulyatory"; break
        case 766: url = "akkumulyatory"; break
        case 638: url = "universalnye-zapasnye-chasti"; break
        case 667: url = "universalnye-zapasnye-chasti"; break
        case 556: url = "dlya-nasosov-i-nasosnyh-stanciy"; break
        case 602: url = "dlya-nasosov-i-nasosnyh-stanciy"; break
        case 618: url = "diski"; break
        case 111: url = "diski"; break
        case 622: url = "chashki"; break
        case 606: url = "chashki"; break
        case 628: url = "dlya-bolgarok-ushm_schetki"; break
        case 120: url = "dlya-bolgarok-ushm_schetki"; break
        // Для электроинструмента{669}
        case 611: url = "dlya-renovatorov-mfi"; break
        case 612: url = "dlya-renovatorov-mfi"; break
        case 613: url = "dlya-renovatorov-mfi"; break
        case 615: url = "dlya-ekscentrikovyh"; break
        case 616: url = "dlya-ekscentrikovyh"; break
        case 118: url = "shlifovalnye-krugi"; break
        case 664: url = "dlya-rubankov"; break
        case 665: url = "dlya-rubankov"; break
        case 670: url = "dlya-kraskopultov"; break
        case 671: url = "dlya-kraskopultov"; break
        case 662: url = "rashodnye-materialy-i-prinadlezhnosti_cirkulyarnye-pily"; break
        case 663: url = "dlya-diskovyh-pil"; break
        case 635: url = "koronki"; break
        case 100: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 101: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 102: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 586: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 637: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 646: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 647: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 648: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 649: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 650: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 788: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 652: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 653: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 654: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 655: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 657: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 658: url = "dlya-perforatorov-i-otboynyh-molotkov"; break
        case 123: url = "koronki"; break
        case 641: url = "koronki-i-pilnye-vency"; break
        case 642: url = "koronki-i-pilnye-vency"; break
        case 643: url = "koronki-i-pilnye-vency"; break
        case 639: url = "dlya-shurupovertov-i-dreley_patrony-i-klyuchi"; break
        case 640: url = "dlya-shurupovertov-i-dreley_patrony-i-klyuchi"; break
        case 129: url = "po-betonu"; break
        case 630: url = "po-betonu"; break
        case 130: url = "po-drevesine"; break
        case 631: url = "po-drevesine"; break
        case 131: url = "po-metallu"; break
        case 632: url = "po-metallu"; break
        case 132: url = "universalnye"; break
        case 634: url = "universalnye"; break
        case 633: url = "po-steklu-i-keramike"; break
        case 550: url = "akkumulyatory"; break
        case 636: url = "dlya-shurupovertov-i-dreley_schetki"; break
        case 892: url = "dlya-shurupovertov-i-dreley_stoyki"; break
        case 751: url = "rashodnye-materialy-i-prinadlezhnosti_cirkulyarnye-pily"; break
        case 752: url = "dlya-torcovochnyh-pil"; break
        // Для садовой техники{672}
        case 676: case 677: url = "kolesa-i-gruntozacepy"; break
        case 685: url = "oborudovanie-dlya-uborki-snega"; break
        case 705: case 706: url = "filtry-i-korpusy-k-filtram"; break
        // Для малой строительной техники{718}
        case 691: case 692: url = "dlya-motopomp"; break
        case 734: case 735: url = "dlya-zatirochnyh-i-shlifovalnyh-mashin"; break
        case 732: url = "dlya-dreley-almaznogo-bureniya_prochaya-osnastka"; break
        case 722: url = "dlya-benzorezov-i-shvonarezchikov_prochaya-osnastka"; break
        case 728: case 729: url = "dlya-glubinnyh-vibratorov"; break

        // Ручной инструмент{138}

        default: break
    }

    return url

}
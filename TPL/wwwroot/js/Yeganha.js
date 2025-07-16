function Yegan(ostan) {
    var selectElement = document.getElementById("YeganDastgirKonnadeh");
    selectElement.options.length = 0;

    if (ostan === 0) {
        selectElement.options[0] = new Option("لطفا استان را انتخاب نمایید", "0");
    }

    if (ostan === "قم") {
        selectElement.options[0] = new Option("", "");
        selectElement.options[1] = new Option("پلیس اطلاعات و امنیت عمومی", "پلیس اطلاعات و امنیت عمومی");
        selectElement.options[2] = new Option("یگان امداد ف.ا.ا قم", "یگان امداد ف.ا.ا قم");
        selectElement.options[3] = new Option("ف.ا. بخش جعفرآباد قم", "ف.ا. بخش جعفرآباد قم");
        selectElement.options[4] = new Option("ف.ا. بخش خلجستان قم", "ف.ا. بخش خلجستان قم");
        selectElement.options[5] = new Option("ف.ا. بخش سلفچگان قم", "ف.ا. بخش سلفچگان قم");
        selectElement.options[6] = new Option("ف.ا. بخش کهک قم", "ف.ا. بخش کهک قم");
        selectElement.options[7] = new Option("فرماندهی انتظامی قائم قم", "فرماندهی انتظامی قائم قم");
        selectElement.options[8] = new Option("فرماندهی انتظامی معصومیه قم", "فرماندهی انتظامی معصومیه قم");
        selectElement.options[9] = new Option("پاسگاه انتظامی جاده اراک قم", "پاسگاه انتظامی جاده اراک قم");
        selectElement.options[10] = new Option("پاسگاه انتظامی دامشهر قم", "پاسگاه انتظامی دامشهر قم");
        selectElement.options[11] = new Option("پاسگاه انتظامی راهجرد قم", "پاسگاه انتظامی راهجرد قم");
        selectElement.options[12] = new Option("پاسگاه انتظامی شکوهیه قم", "پاسگاه انتظامی شکوهیه قم");
        selectElement.options[13] = new Option("پاسگاه انتظامی طغرود قم", "پاسگاه انتظامی طغرود قم");
        selectElement.options[14] = new Option("پاسگاه انتظامی قاهان قم", "پاسگاه انتظامی قاهان قم");
        selectElement.options[15] = new Option("پاسگاه انتظامی قلعه چم قم", "پاسگاه انتظامی قلعه چم قم");
        selectElement.options[16] = new Option("پاسگاه انتظامی قمرود قم", "پاسگاه انتظامی قمرود قم");
        selectElement.options[17] = new Option("پاسگاه انتظامی لنگرود قم", "پاسگاه انتظامی لنگرود قم");
        selectElement.options[18] = new Option("پاسگاه انتظامی کوشک نصرت قم", "پاسگاه انتظامی کوشک نصرت قم");
        selectElement.options[19] = new Option("ایستگاه انتظامی پایانه مسافربری", "ایستگاه انتظامی پایانه مسافربری");
        selectElement.options[20] = new Option("یگان انتظامی مرکز هسته‌ای فردو", "یگان انتظامی مرکز هسته‌ای فردو");
        selectElement.options[21] = new Option("کلانتری 11 جانبازان قم", "کلانتری 11 جانبازان قم");
        selectElement.options[22] = new Option("کلانتری 12 بلوار شهید ایمانی قم", "کلانتری 12 بلوار شهید ایمانی قم");
        selectElement.options[23] = new Option("کلانتری 13 شهید سعیدی قم", "کلانتری 13 شهید سعیدی قم");
        selectElement.options[24] = new Option("کلانتری 14 ولیعصر قم", "کلانتری 14 ولیعصر قم");
        selectElement.options[25] = new Option("کلانتری 15 امین قم", "کلانتری 15 امین قم");
        selectElement.options[26] = new Option("کلانتری 16 شهرک قدس قم", "کلانتری 16 شهرک قدس قم");
        selectElement.options[27] = new Option("کلانتری 17 شهید بهشتی قم", "کلانتری 17 شهید بهشتی قم");
        selectElement.options[28] = new Option("کلانتری 18 شهید خداکرم قم", "کلانتری 18 شهید خداکرم قم");
        selectElement.options[29] = new Option("کلانتری 19 توحید قم", "کلانتری 19 توحید قم");
        selectElement.options[30] = new Option("کلانتری 20 فاطمی قم", "کلانتری 20 فاطمی قم");
        selectElement.options[31] = new Option("کلانتری 21 یزدانشهر قم", "کلانتری 21 یزدانشهر قم");
        selectElement.options[32] = new Option("کلانتری 22 شهرک پردیسان قم", "کلانتری 22 شهرک پردیسان قم");
        selectElement.options[33] = new Option("کلانتری 24 پردیسان قم", "کلانتری 24 پردیسان قم");
        selectElement.options[34] = new Option("کلانتری 25 پانزده خرداد قم", "کلانتری 25 پانزده خرداد قم");
        selectElement.options[35] = new Option("کلانتری 27 قنوات قم", "کلانتری 27 قنوات قم");
        selectElement.options[36] = new Option("کلانتری 28 شهر قائم قم", "کلانتری 28 شهر قائم قم");
        selectElement.options[37] = new Option("پلیس مبارزه با مواد مخدر", "پلیس مبارزه با مواد مخدر");
        selectElement.options[38] = new Option("پلیس امنیت اقتصادی", "پلیس امنیت اقتصادی");
        selectElement.options[39] = new Option("پلیس فتا", "پلیس فتا");
        selectElement.options[40] = new Option("پلیس راهور", "پلیس راهور");
        selectElement.options[41] = new Option("پلیس آگاهی", "پلیس آگاهی");
        selectElement.options[42] = new Option("پلیسراه اتوبان قم-تهران", "پلیسراه اتوبان قم-تهران");
        selectElement.options[43] = new Option("پلیسراه جاده قدیم قم-تهران", "پلیسراه جاده قدیم قم-تهران");
        selectElement.options[44] = new Option("پلیسراه جاده قدیم قم-کاشان", "پلیسراه جاده قدیم قم-کاشان");
        selectElement.options[45] = new Option("پلیسراه جاده قم-گرمسار", "پلیسراه جاده قم-گرمسار");
        selectElement.options[46] = new Option("یگان ویژه", "یگان ویژه");
    }
    else {
        selectElement.options[0] = new Option("", "");
        selectElement.options[1] = new Option("پلیس اطلاعات و امنیت عمومی", "پلیس اطلاعات و امنیت عمومی");
        selectElement.options[2] = new Option("یگان ویژه", "یگان ویژه");
        selectElement.options[3] = new Option("یگان امداد", "یگان امداد");
        selectElement.options[4] = new Option("پلیس مبارزه با مواد مخدر", "پلیس مبارزه با مواد مخدر");
        selectElement.options[5] = new Option("پلیس امنیت اقتصادی", "پلیس امنیت اقتصادی");
        selectElement.options[6] = new Option("پلیس فتا", "پلیس فتا");
        selectElement.options[7] = new Option("پلیس راه", "پلیس راه");
        selectElement.options[8] = new Option("پلیس راهور", "پلیس راهور");
        selectElement.options[9] = new Option("پلیس آگاهی", "پلیس آگاهی");
        selectElement.options[10] = new Option("فرماندهی انتظامی شهرستان", "فرماندهی انتظامی شهرستان");
    }
}

function Dinselect(din) {
    var selectElement = document.getElementById("ReligionSelect");
    selectElement.options.length = 0;

    if (din === 0) {
        selectElement.options[0] = new Option("لطفا دین را انتخاب نمایید", "0");
    }

    if (din === "اسلام") {
        selectElement.options[0] = new Option("شیعه", "شیعه");
        selectElement.options[1] = new Option("سنی", "سنی");
    }

    else if (din === "بهایی") {
        selectElement.options[0] = new Option("بهایی", "بهایی");

    }
    else if (din === "مسیحی") {
        selectElement.options[0] = new Option("مسیحی", "مسیحی");

    }
    else if (din === "زرتشتی") {
        selectElement.options[0] = new Option("زرتشتی", "زرتشتی");

    }
    else if (din === "یهودی") {
        selectElement.options[0] = new Option("یهودی", "یهودی");

    }
    else {
        selectElement.options[0] = new Option(din,din);

    }
}


function Ferqeh(Mazhab) {
    var selectElement = document.getElementById("ShakehMazhabSelect");
    selectElement.options.length = 0;

    if (Mazhab === 0) {
        selectElement.options[0] = new Option("لطفا مذهب را انتخاب نمایید", "0");
    }

    if (Mazhab === "شیعه") {
        selectElement.options[0] = new Option("دوازده امامی", "دوازده امامی");
        selectElement.options[1] = new Option("زیدی", "زیدی");
        selectElement.options[2] = new Option("اسماعیلی", "اسماعیلی");
        selectElement.options[3] = new Option("علوی", "علوی");
        selectElement.options[4] = new Option("سایر فرق تشیع", "سایر فرق تشیع");
      
    }

    else if (Mazhab === "سنی") {
        selectElement.options[0] = new Option("حنفی", "حنفی");
        selectElement.options[1] = new Option("شافعی", "شافعی");
        selectElement.options[2] = new Option("مالکی", "مالکی");
        selectElement.options[3] = new Option("حنبلی", "حنبلی");
        selectElement.options[4] = new Option("سایر فرق اهل تسنن", "سایر فرق اهل تسنن");
      
    }
    else if (Mazhab === "بهایی") {
        selectElement.options[0] = new Option("بهایی", "بهایی");

    }
    else if (Mazhab === "مسیحی") {
        selectElement.options[0] = new Option("کاتولیک", "کاتولیک");
        selectElement.options[1] = new Option("ارتدکس", "ارتدکس");
        selectElement.options[2] = new Option("پروتستان", "پروتستان");
        selectElement.options[3] = new Option("سایر فرق مسیحیت", "سایر فرق مسیحیت");

    }
    else if (Mazhab === "زرتشتی") {
        selectElement.options[0] = new Option("زرتشتی", "زرتشتی");

    }
    else if (Mazhab === "یهودی") {
        selectElement.options[0] = new Option("یهودی", "یهودی");

    } else {
        selectElement.options[0] = new Option(Mazhab, Mazhab);

    }
}


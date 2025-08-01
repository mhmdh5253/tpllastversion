(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory()
        : typeof define === "function" && define.amd
        ? define(factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.locales =
            global.FormValidation.locales || {}, global.FormValidation.locales.ar_MA = factory()));
})(this,
    (function() {
        "use strict";

        /**
         * Arabic language package
         * Translated by @Arkni
         */
        const ar_MA = {
            base64: {
                default: "الرجاء إدخال قيمة مشفرة طبقا للقاعدة 64.",
            },
            between: {
                default: "الرجاء إدخال قيمة بين %s و %s .",
                notInclusive: "الرجاء إدخال قيمة بين %s و %s بدقة.",
            },
            bic: {
                default: "الرجاء إدخال رقم BIC صالح.",
            },
            callback: {
                default: "الرجاء إدخال قيمة صالحة.",
            },
            choice: {
                between: "الرجاء إختيار %s-%s خيارات.",
                default: "الرجاء إدخال قيمة صالحة.",
                less: "الرجاء اختيار %s خيارات كحد أدنى.",
                more: "الرجاء اختيار %s خيارات كحد أقصى.",
            },
            color: {
                default: "الرجاء إدخال رمز لون صالح.",
            },
            creditCard: {
                default: "الرجاء إدخال رقم بطاقة إئتمان صحيح.",
            },
            cusip: {
                default: "الرجاء إدخال رقم CUSIP صالح.",
            },
            date: {
                default: "الرجاء إدخال تاريخ صالح.",
                max: "الرجاء إدخال تاريخ قبل %s.",
                min: "الرجاء إدخال تاريخ بعد %s.",
                range: "الرجاء إدخال تاريخ في المجال %s - %s.",
            },
            different: {
                default: "الرجاء إدخال قيمة مختلفة.",
            },
            digits: {
                default: "الرجاء إدخال الأرقام فقط.",
            },
            ean: {
                default: "الرجاء إدخال رقم EAN صالح.",
            },
            ein: {
                default: "الرجاء إدخال رقم EIN صالح.",
            },
            emailAddress: {
                default: "الرجاء إدخال بريد إلكتروني صحيح.",
            },
            file: {
                default: "الرجاء إختيار ملف صالح.",
            },
            greaterThan: {
                default: "الرجاء إدخال قيمة أكبر من أو تساوي %s.",
                notInclusive: "الرجاء إدخال قيمة أكبر من %s.",
            },
            grid: {
                default: "الرجاء إدخال رقم GRid صالح.",
            },
            hex: {
                default: "الرجاء إدخال رقم ست عشري صالح.",
            },
            iban: {
                countries: {
                    AD: "أندورا",
                    AE: "الإمارات العربية المتحدة",
                    AL: "ألبانيا",
                    AO: "أنغولا",
                    AT: "النمسا",
                    AZ: "أذربيجان",
                    BA: "البوسنة والهرسك",
                    BE: "بلجيكا",
                    BF: "بوركينا فاسو",
                    BG: "بلغاريا",
                    BH: "البحرين",
                    BI: "بوروندي",
                    BJ: "بنين",
                    BR: "البرازيل",
                    CH: "سويسرا",
                    CI: "ساحل العاج",
                    CM: "الكاميرون",
                    CR: "كوستاريكا",
                    CV: "الرأس الأخضر",
                    CY: "قبرص",
                    CZ: "التشيك",
                    DE: "ألمانيا",
                    DK: "الدنمارك",
                    DO: "جمهورية الدومينيكان",
                    DZ: "الجزائر",
                    EE: "إستونيا",
                    ES: "إسبانيا",
                    FI: "فنلندا",
                    FO: "جزر فارو",
                    FR: "فرنسا",
                    GB: "المملكة المتحدة",
                    GE: "جورجيا",
                    GI: "جبل طارق",
                    GL: "جرينلاند",
                    GR: "اليونان",
                    GT: "غواتيمالا",
                    HR: "كرواتيا",
                    HU: "المجر",
                    IE: "أيرلندا",
                    IL: "إسرائيل",
                    IR: "إيران",
                    IS: "آيسلندا",
                    IT: "إيطاليا",
                    JO: "الأردن",
                    KW: "الكويت",
                    KZ: "كازاخستان",
                    LB: "لبنان",
                    LI: "ليختنشتاين",
                    LT: "ليتوانيا",
                    LU: "لوكسمبورغ",
                    LV: "لاتفيا",
                    MC: "موناكو",
                    MD: "مولدوفا",
                    ME: "الجبل الأسود",
                    MG: "مدغشقر",
                    MK: "جمهورية مقدونيا",
                    ML: "مالي",
                    MR: "موريتانيا",
                    MT: "مالطا",
                    MU: "موريشيوس",
                    MZ: "موزمبيق",
                    NL: "هولندا",
                    NO: "النرويج",
                    PK: "باكستان",
                    PL: "بولندا",
                    PS: "فلسطين",
                    PT: "البرتغال",
                    QA: "قطر",
                    RO: "رومانيا",
                    RS: "صربيا",
                    SA: "المملكة العربية السعودية",
                    SE: "السويد",
                    SI: "سلوفينيا",
                    SK: "سلوفاكيا",
                    SM: "سان مارينو",
                    SN: "السنغال",
                    TL: "تيمور الشرقية",
                    TN: "تونس",
                    TR: "تركيا",
                    VG: "جزر العذراء البريطانية",
                    XK: "جمهورية كوسوفو",
                },
                country: "الرجاء إدخال رقم IBAN صالح في %s.",
                default: "الرجاء إدخال رقم IBAN صالح.",
            },
            id: {
                countries: {
                    BA: "البوسنة والهرسك",
                    BG: "بلغاريا",
                    BR: "البرازيل",
                    CH: "سويسرا",
                    CL: "تشيلي",
                    CN: "الصين",
                    CZ: "التشيك",
                    DK: "الدنمارك",
                    EE: "إستونيا",
                    ES: "إسبانيا",
                    FI: "فنلندا",
                    HR: "كرواتيا",
                    IE: "أيرلندا",
                    IS: "آيسلندا",
                    LT: "ليتوانيا",
                    LV: "لاتفيا",
                    ME: "الجبل الأسود",
                    MK: "جمهورية مقدونيا",
                    NL: "هولندا",
                    PL: "بولندا",
                    RO: "رومانيا",
                    RS: "صربيا",
                    SE: "السويد",
                    SI: "سلوفينيا",
                    SK: "سلوفاكيا",
                    SM: "سان مارينو",
                    TH: "تايلاند",
                    TR: "تركيا",
                    ZA: "جنوب أفريقيا",
                },
                country: "الرجاء إدخال رقم تعريف صالح في %s.",
                default: "الرجاء إدخال رقم هوية صالحة.",
            },
            identical: {
                default: "الرجاء إدخال نفس القيمة.",
            },
            imei: {
                default: "الرجاء إدخال رقم IMEI صالح.",
            },
            imo: {
                default: "الرجاء إدخال رقم IMO صالح.",
            },
            integer: {
                default: "الرجاء إدخال رقم صحيح.",
            },
            ip: {
                default: "الرجاء إدخال عنوان IP صالح.",
                ipv4: "الرجاء إدخال عنوان IPv4 صالح.",
                ipv6: "الرجاء إدخال عنوان IPv6 صالح.",
            },
            isbn: {
                default: "الرجاء إدخال رقم ISBN صالح.",
            },
            isin: {
                default: "الرجاء إدخال رقم ISIN صالح.",
            },
            ismn: {
                default: "الرجاء إدخال رقم ISMN صالح.",
            },
            issn: {
                default: "الرجاء إدخال رقم ISSN صالح.",
            },
            lessThan: {
                default: "الرجاء إدخال قيمة أصغر من أو تساوي %s.",
                notInclusive: "الرجاء إدخال قيمة أصغر من %s.",
            },
            mac: {
                default: "يرجى إدخال عنوان MAC صالح.",
            },
            meid: {
                default: "الرجاء إدخال رقم MEID صالح.",
            },
            notEmpty: {
                default: "الرجاء إدخال قيمة.",
            },
            numeric: {
                default: "الرجاء إدخال عدد عشري صالح.",
            },
            phone: {
                countries: {
                    AE: "الإمارات العربية المتحدة",
                    BG: "بلغاريا",
                    BR: "البرازيل",
                    CN: "الصين",
                    CZ: "التشيك",
                    DE: "ألمانيا",
                    DK: "الدنمارك",
                    ES: "إسبانيا",
                    FR: "فرنسا",
                    GB: "المملكة المتحدة",
                    IN: "الهند",
                    MA: "المغرب",
                    NL: "هولندا",
                    PK: "باكستان",
                    RO: "رومانيا",
                    RU: "روسيا",
                    SK: "سلوفاكيا",
                    TH: "تايلاند",
                    US: "الولايات المتحدة",
                    VE: "فنزويلا",
                },
                country: "الرجاء إدخال رقم هاتف صالح في %s.",
                default: "الرجاء إدخال رقم هاتف صحيح.",
            },
            promise: {
                default: "الرجاء إدخال قيمة صالحة.",
            },
            regexp: {
                default: "الرجاء إدخال قيمة مطابقة للنمط.",
            },
            remote: {
                default: "الرجاء إدخال قيمة صالحة.",
            },
            rtn: {
                default: "الرجاء إدخال رقم RTN صالح.",
            },
            sedol: {
                default: "الرجاء إدخال رقم SEDOL صالح.",
            },
            siren: {
                default: "الرجاء إدخال رقم SIREN صالح.",
            },
            siret: {
                default: "الرجاء إدخال رقم SIRET صالح.",
            },
            step: {
                default: "الرجاء إدخال قيمة من مضاعفات %s .",
            },
            stringCase: {
                default: "الرجاء إدخال أحرف صغيرة فقط.",
                upper: "الرجاء إدخال أحرف كبيرة فقط.",
            },
            stringLength: {
                between: "الرجاء إدخال قيمة ذات عدد حروف بين %s و %s حرفا.",
                default: "الرجاء إدخال قيمة ذات طول صحيح.",
                less: "الرجاء إدخال أقل من %s حرفا.",
                more: "الرجاء إدخال أكتر من %s حرفا.",
            },
            uri: {
                default: "الرجاء إدخال URI صالح.",
            },
            uuid: {
                default: "الرجاء إدخال رقم UUID صالح.",
                version: "الرجاء إدخال رقم UUID صالح إصدار %s.",
            },
            vat: {
                countries: {
                    AT: "النمسا",
                    BE: "بلجيكا",
                    BG: "بلغاريا",
                    BR: "البرازيل",
                    CH: "سويسرا",
                    CY: "قبرص",
                    CZ: "التشيك",
                    DE: "جورجيا",
                    DK: "الدنمارك",
                    EE: "إستونيا",
                    EL: "اليونان",
                    ES: "إسبانيا",
                    FI: "فنلندا",
                    FR: "فرنسا",
                    GB: "المملكة المتحدة",
                    GR: "اليونان",
                    HR: "كرواتيا",
                    HU: "المجر",
                    IE: "أيرلندا",
                    IS: "آيسلندا",
                    IT: "إيطاليا",
                    LT: "ليتوانيا",
                    LU: "لوكسمبورغ",
                    LV: "لاتفيا",
                    MT: "مالطا",
                    NL: "هولندا",
                    NO: "النرويج",
                    PL: "بولندا",
                    PT: "البرتغال",
                    RO: "رومانيا",
                    RS: "صربيا",
                    RU: "روسيا",
                    SE: "السويد",
                    SI: "سلوفينيا",
                    SK: "سلوفاكيا",
                    VE: "فنزويلا",
                    ZA: "جنوب أفريقيا",
                },
                country: "الرجاء إدخال رقم VAT صالح في %s.",
                default: "الرجاء إدخال رقم VAT صالح.",
            },
            vin: {
                default: "الرجاء إدخال رقم VIN صالح.",
            },
            zipCode: {
                countries: {
                    AT: "النمسا",
                    BG: "بلغاريا",
                    BR: "البرازيل",
                    CA: "كندا",
                    CH: "سويسرا",
                    CZ: "التشيك",
                    DE: "ألمانيا",
                    DK: "الدنمارك",
                    ES: "إسبانيا",
                    FR: "فرنسا",
                    GB: "المملكة المتحدة",
                    IE: "أيرلندا",
                    IN: "الهند",
                    IT: "إيطاليا",
                    MA: "المغرب",
                    NL: "هولندا",
                    PL: "بولندا",
                    PT: "البرتغال",
                    RO: "رومانيا",
                    RU: "روسيا",
                    SE: "السويد",
                    SG: "سنغافورة",
                    SK: "سلوفاكيا",
                    US: "الولايات المتحدة",
                },
                country: "الرجاء إدخال رمز بريدي صالح في %s.",
                default: "الرجاء إدخال رمز بريدي صالح.",
            },
        };

        return ar_MA;

    }));
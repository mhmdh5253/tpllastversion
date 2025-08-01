(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory()
        : typeof define === "function" && define.amd
        ? define(factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.locales =
            global.FormValidation.locales || {}, global.FormValidation.locales.el_GR = factory()));
})(this,
    (function() {
        "use strict";

        /**
         * Greek language package
         * Translated by @pRieStaKos
         */
        const el_GR = {
            base64: {
                default: "Παρακαλώ εισάγετε μια έγκυρη κωδικοποίηση base 64",
            },
            between: {
                default: "Παρακαλώ εισάγετε μια τιμή μεταξύ %s και %s",
                notInclusive: "Παρακαλώ εισάγετε μια τιμή μεταξύ %s και %s αυστηρά",
            },
            bic: {
                default: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό BIC",
            },
            callback: {
                default: "Παρακαλώ εισάγετε μια έγκυρη τιμή",
            },
            choice: {
                between: "Παρακαλώ επιλέξτε %s - %s επιλογές",
                default: "Παρακαλώ εισάγετε μια έγκυρη τιμή",
                less: "Παρακαλώ επιλέξτε %s επιλογές στο ελάχιστο",
                more: "Παρακαλώ επιλέξτε %s επιλογές στο μέγιστο",
            },
            color: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο χρώμα",
            },
            creditCard: {
                default: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό πιστωτικής κάρτας",
            },
            cusip: {
                default: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό CUSIP",
            },
            date: {
                default: "Παρακαλώ εισάγετε μια έγκυρη ημερομηνία",
                max: "Παρακαλώ εισάγετε ημερομηνία πριν από %s",
                min: "Παρακαλώ εισάγετε ημερομηνία μετά από %s",
                range: "Παρακαλώ εισάγετε ημερομηνία μεταξύ %s - %s",
            },
            different: {
                default: "Παρακαλώ εισάγετε μια διαφορετική τιμή",
            },
            digits: {
                default: "Παρακαλώ εισάγετε μόνο ψηφία",
            },
            ean: {
                default: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό EAN",
            },
            ein: {
                default: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό EIN",
            },
            emailAddress: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο email",
            },
            file: {
                default: "Παρακαλώ επιλέξτε ένα έγκυρο αρχείο",
            },
            greaterThan: {
                default: "Παρακαλώ εισάγετε μια τιμή μεγαλύτερη ή ίση με %s",
                notInclusive: "Παρακαλώ εισάγετε μια τιμή μεγαλύτερη από %s",
            },
            grid: {
                default: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό GRId",
            },
            hex: {
                default: "Παρακαλώ εισάγετε έναν έγκυρο δεκαεξαδικό αριθμό",
            },
            iban: {
                countries: {
                    AD: "Ανδόρα",
                    AE: "Ηνωμένα Αραβικά Εμιράτα",
                    AL: "Αλβανία",
                    AO: "Αγκόλα",
                    AT: "Αυστρία",
                    AZ: "Αζερμπαϊτζάν",
                    BA: "Βοσνία και Ερζεγοβίνη",
                    BE: "Βέλγιο",
                    BF: "Μπουρκίνα Φάσο",
                    BG: "Βουλγαρία",
                    BH: "Μπαχρέιν",
                    BI: "Μπουρούντι",
                    BJ: "Μπενίν",
                    BR: "Βραζιλία",
                    CH: "Ελβετία",
                    CI: "Ακτή Ελεφαντοστού",
                    CM: "Καμερούν",
                    CR: "Κόστα Ρίκα",
                    CV: "Cape Verde",
                    CY: "Κύπρος",
                    CZ: "Δημοκρατία της Τσεχίας",
                    DE: "Γερμανία",
                    DK: "Δανία",
                    DO: "Δομινικανή Δημοκρατία",
                    DZ: "Αλγερία",
                    EE: "Εσθονία",
                    ES: "Ισπανία",
                    FI: "Φινλανδία",
                    FO: "Νησιά Φερόε",
                    FR: "Γαλλία",
                    GB: "Ηνωμένο Βασίλειο",
                    GE: "Γεωργία",
                    GI: "Γιβραλτάρ",
                    GL: "Γροιλανδία",
                    GR: "Ελλάδα",
                    GT: "Γουατεμάλα",
                    HR: "Κροατία",
                    HU: "Ουγγαρία",
                    IE: "Ιρλανδία",
                    IL: "Ισραήλ",
                    IR: "Ιράν",
                    IS: "Ισλανδία",
                    IT: "Ιταλία",
                    JO: "Ιορδανία",
                    KW: "Κουβέιτ",
                    KZ: "Καζακστάν",
                    LB: "Λίβανος",
                    LI: "Λιχτενστάιν",
                    LT: "Λιθουανία",
                    LU: "Λουξεμβούργο",
                    LV: "Λετονία",
                    MC: "Μονακό",
                    MD: "Μολδαβία",
                    ME: "Μαυροβούνιο",
                    MG: "Μαδαγασκάρη",
                    MK: "πΓΔΜ",
                    ML: "Μάλι",
                    MR: "Μαυριτανία",
                    MT: "Μάλτα",
                    MU: "Μαυρίκιος",
                    MZ: "Μοζαμβίκη",
                    NL: "Ολλανδία",
                    NO: "Νορβηγία",
                    PK: "Πακιστάν",
                    PL: "Πολωνία",
                    PS: "Παλαιστίνη",
                    PT: "Πορτογαλία",
                    QA: "Κατάρ",
                    RO: "Ρουμανία",
                    RS: "Σερβία",
                    SA: "Σαουδική Αραβία",
                    SE: "Σουηδία",
                    SI: "Σλοβενία",
                    SK: "Σλοβακία",
                    SM: "Σαν Μαρίνο",
                    SN: "Σενεγάλη",
                    TL: "Ανατολικό Τιμόρ",
                    TN: "Τυνησία",
                    TR: "Τουρκία",
                    VG: "Βρετανικές Παρθένοι Νήσοι",
                    XK: "Δημοκρατία του Κοσσυφοπεδίου",
                },
                country: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό IBAN στην %s",
                default: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό IBAN",
            },
            id: {
                countries: {
                    BA: "Βοσνία και Ερζεγοβίνη",
                    BG: "Βουλγαρία",
                    BR: "Βραζιλία",
                    CH: "Ελβετία",
                    CL: "Χιλή",
                    CN: "Κίνα",
                    CZ: "Δημοκρατία της Τσεχίας",
                    DK: "Δανία",
                    EE: "Εσθονία",
                    ES: "Ισπανία",
                    FI: "Φινλανδία",
                    HR: "Κροατία",
                    IE: "Ιρλανδία",
                    IS: "Ισλανδία",
                    LT: "Λιθουανία",
                    LV: "Λετονία",
                    ME: "Μαυροβούνιο",
                    MK: "Μακεδονία",
                    NL: "Ολλανδία",
                    PL: "Πολωνία",
                    RO: "Ρουμανία",
                    RS: "Σερβία",
                    SE: "Σουηδία",
                    SI: "Σλοβενία",
                    SK: "Σλοβακία",
                    SM: "Σαν Μαρίνο",
                    TH: "Ταϊλάνδη",
                    TR: "Τουρκία",
                    ZA: "Νότια Αφρική",
                },
                country: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ταυτότητας στην %s",
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ταυτότητας",
            },
            identical: {
                default: "Παρακαλώ εισάγετε την ίδια τιμή",
            },
            imei: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό IMEI",
            },
            imo: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό IMO",
            },
            integer: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό",
            },
            ip: {
                default: "Παρακαλώ εισάγετε μία έγκυρη IP διεύθυνση",
                ipv4: "Παρακαλώ εισάγετε μία έγκυρη διεύθυνση IPv4",
                ipv6: "Παρακαλώ εισάγετε μία έγκυρη διεύθυνση IPv6",
            },
            isbn: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ISBN",
            },
            isin: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ISIN",
            },
            ismn: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ISMN",
            },
            issn: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ISSN",
            },
            lessThan: {
                default: "Παρακαλώ εισάγετε μια τιμή μικρότερη ή ίση με %s",
                notInclusive: "Παρακαλώ εισάγετε μια τιμή μικρότερη από %s",
            },
            mac: {
                default: "Παρακαλώ εισάγετε μία έγκυρη MAC διεύθυνση",
            },
            meid: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό MEID",
            },
            notEmpty: {
                default: "Παρακαλώ εισάγετε μια τιμή",
            },
            numeric: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο δεκαδικό αριθμό",
            },
            phone: {
                countries: {
                    AE: "Ηνωμένα Αραβικά Εμιράτα",
                    BG: "Βουλγαρία",
                    BR: "Βραζιλία",
                    CN: "Κίνα",
                    CZ: "Δημοκρατία της Τσεχίας",
                    DE: "Γερμανία",
                    DK: "Δανία",
                    ES: "Ισπανία",
                    FR: "Γαλλία",
                    GB: "Ηνωμένο Βασίλειο",
                    IN: "Ινδία",
                    MA: "Μαρόκο",
                    NL: "Ολλανδία",
                    PK: "Πακιστάν",
                    RO: "Ρουμανία",
                    RU: "Ρωσία",
                    SK: "Σλοβακία",
                    TH: "Ταϊλάνδη",
                    US: "ΗΠΑ",
                    VE: "Βενεζουέλα",
                },
                country: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό τηλεφώνου στην %s",
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό τηλεφώνου",
            },
            promise: {
                default: "Παρακαλώ εισάγετε μια έγκυρη τιμή",
            },
            regexp: {
                default: "Παρακαλώ εισάγετε μια τιμή όπου ταιριάζει στο υπόδειγμα",
            },
            remote: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό",
            },
            rtn: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό RTN",
            },
            sedol: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό SEDOL",
            },
            siren: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό SIREN",
            },
            siret: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό SIRET",
            },
            step: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο βήμα από %s",
            },
            stringCase: {
                default: "Παρακαλώ εισάγετε μόνο πεζούς χαρακτήρες",
                upper: "Παρακαλώ εισάγετε μόνο κεφαλαία γράμματα",
            },
            stringLength: {
                between: "Παρακαλούμε, εισάγετε τιμή μεταξύ %s και %s μήκος χαρακτήρων",
                default: "Παρακαλώ εισάγετε μια τιμή με έγκυρο μήκος",
                less: "Παρακαλούμε εισάγετε λιγότερο από %s χαρακτήρες",
                more: "Παρακαλούμε εισάγετε περισσότερο από %s χαρακτήρες",
            },
            uri: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο URI",
            },
            uuid: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό UUID",
                version: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό έκδοσης %s",
            },
            vat: {
                countries: {
                    AT: "Αυστρία",
                    BE: "Βέλγιο",
                    BG: "Βουλγαρία",
                    BR: "Βραζιλία",
                    CH: "Ελβετία",
                    CY: "Κύπρος",
                    CZ: "Δημοκρατία της Τσεχίας",
                    DE: "Γερμανία",
                    DK: "Δανία",
                    EE: "Εσθονία",
                    EL: "Ελλάδα",
                    ES: "Ισπανία",
                    FI: "Φινλανδία",
                    FR: "Γαλλία",
                    GB: "Ηνωμένο Βασίλειο",
                    GR: "Ελλάδα",
                    HR: "Κροατία",
                    HU: "Ουγγαρία",
                    IE: "Ιρλανδία",
                    IS: "Ισλανδία",
                    IT: "Ιταλία",
                    LT: "Λιθουανία",
                    LU: "Λουξεμβούργο",
                    LV: "Λετονία",
                    MT: "Μάλτα",
                    NL: "Ολλανδία",
                    NO: "Νορβηγία",
                    PL: "Πολωνία",
                    PT: "Πορτογαλία",
                    RO: "Ρουμανία",
                    RS: "Σερβία",
                    RU: "Ρωσία",
                    SE: "Σουηδία",
                    SI: "Σλοβενία",
                    SK: "Σλοβακία",
                    VE: "Βενεζουέλα",
                    ZA: "Νότια Αφρική",
                },
                country: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ΦΠΑ στην %s",
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό ΦΠΑ",
            },
            vin: {
                default: "Παρακαλώ εισάγετε ένα έγκυρο αριθμό VIN",
            },
            zipCode: {
                countries: {
                    AT: "Αυστρία",
                    BG: "Βουλγαρία",
                    BR: "Βραζιλία",
                    CA: "Καναδάς",
                    CH: "Ελβετία",
                    CZ: "Δημοκρατία της Τσεχίας",
                    DE: "Γερμανία",
                    DK: "Δανία",
                    ES: "Ισπανία",
                    FR: "Γαλλία",
                    GB: "Ηνωμένο Βασίλειο",
                    IE: "Ιρλανδία",
                    IN: "Ινδία",
                    IT: "Ιταλία",
                    MA: "Μαρόκο",
                    NL: "Ολλανδία",
                    PL: "Πολωνία",
                    PT: "Πορτογαλία",
                    RO: "Ρουμανία",
                    RU: "Ρωσία",
                    SE: "Σουηδία",
                    SG: "Σιγκαπούρη",
                    SK: "Σλοβακία",
                    US: "ΗΠΑ",
                },
                country: "Παρακαλώ εισάγετε ένα έγκυρο ταχυδρομικό κώδικα στην %s",
                default: "Παρακαλώ εισάγετε ένα έγκυρο ταχυδρομικό κώδικα",
            },
        };

        return el_GR;

    }));
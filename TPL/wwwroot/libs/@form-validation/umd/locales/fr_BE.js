(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory()
        : typeof define === "function" && define.amd
        ? define(factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.locales =
            global.FormValidation.locales || {}, global.FormValidation.locales.fr_BE = factory()));
})(this,
    (function() {
        "use strict";

        /**
         * Belgium (French) language package
         * Translated by @neilime
         */
        const fr_BE = {
            base64: {
                default: "Veuillez fournir une donnée correctement encodée en Base64",
            },
            between: {
                default: "Veuillez fournir une valeur comprise entre %s et %s",
                notInclusive: "Veuillez fournir une valeur strictement comprise entre %s et %s",
            },
            bic: {
                default: "Veuillez fournir un code-barre BIC valide",
            },
            callback: {
                default: "Veuillez fournir une valeur valide",
            },
            choice: {
                between: "Veuillez choisir de %s à %s options",
                default: "Veuillez fournir une valeur valide",
                less: "Veuillez choisir au minimum %s options",
                more: "Veuillez choisir au maximum %s options",
            },
            color: {
                default: "Veuillez fournir une couleur valide",
            },
            creditCard: {
                default: "Veuillez fournir un numéro de carte de crédit valide",
            },
            cusip: {
                default: "Veuillez fournir un code CUSIP valide",
            },
            date: {
                default: "Veuillez fournir une date valide",
                max: "Veuillez fournir une date inférieure à %s",
                min: "Veuillez fournir une date supérieure à %s",
                range: "Veuillez fournir une date comprise entre %s et %s",
            },
            different: {
                default: "Veuillez fournir une valeur différente",
            },
            digits: {
                default: "Veuillez ne fournir que des chiffres",
            },
            ean: {
                default: "Veuillez fournir un code-barre EAN valide",
            },
            ein: {
                default: "Veuillez fournir un code-barre EIN valide",
            },
            emailAddress: {
                default: "Veuillez fournir une adresse e-mail valide",
            },
            file: {
                default: "Veuillez choisir un fichier valide",
            },
            greaterThan: {
                default: "Veuillez fournir une valeur supérieure ou égale à %s",
                notInclusive: "Veuillez fournir une valeur supérieure à %s",
            },
            grid: {
                default: "Veuillez fournir un code GRId valide",
            },
            hex: {
                default: "Veuillez fournir un nombre hexadécimal valide",
            },
            iban: {
                countries: {
                    AD: "Andorre",
                    AE: "Émirats Arabes Unis",
                    AL: "Albanie",
                    AO: "Angola",
                    AT: "Autriche",
                    AZ: "Azerbaïdjan",
                    BA: "Bosnie-Herzégovine",
                    BE: "Belgique",
                    BF: "Burkina Faso",
                    BG: "Bulgarie",
                    BH: "Bahrein",
                    BI: "Burundi",
                    BJ: "Bénin",
                    BR: "Brésil",
                    CH: "Suisse",
                    CI: "Côte d'ivoire",
                    CM: "Cameroun",
                    CR: "Costa Rica",
                    CV: "Cap Vert",
                    CY: "Chypre",
                    CZ: "Tchèque",
                    DE: "Allemagne",
                    DK: "Danemark",
                    DO: "République Dominicaine",
                    DZ: "Algérie",
                    EE: "Estonie",
                    ES: "Espagne",
                    FI: "Finlande",
                    FO: "Îles Féroé",
                    FR: "France",
                    GB: "Royaume Uni",
                    GE: "Géorgie",
                    GI: "Gibraltar",
                    GL: "Groënland",
                    GR: "Gréce",
                    GT: "Guatemala",
                    HR: "Croatie",
                    HU: "Hongrie",
                    IE: "Irlande",
                    IL: "Israël",
                    IR: "Iran",
                    IS: "Islande",
                    IT: "Italie",
                    JO: "Jordanie",
                    KW: "Koweït",
                    KZ: "Kazakhstan",
                    LB: "Liban",
                    LI: "Liechtenstein",
                    LT: "Lithuanie",
                    LU: "Luxembourg",
                    LV: "Lettonie",
                    MC: "Monaco",
                    MD: "Moldavie",
                    ME: "Monténégro",
                    MG: "Madagascar",
                    MK: "Macédoine",
                    ML: "Mali",
                    MR: "Mauritanie",
                    MT: "Malte",
                    MU: "Maurice",
                    MZ: "Mozambique",
                    NL: "Pays-Bas",
                    NO: "Norvège",
                    PK: "Pakistan",
                    PL: "Pologne",
                    PS: "Palestine",
                    PT: "Portugal",
                    QA: "Quatar",
                    RO: "Roumanie",
                    RS: "Serbie",
                    SA: "Arabie Saoudite",
                    SE: "Suède",
                    SI: "Slovènie",
                    SK: "Slovaquie",
                    SM: "Saint-Marin",
                    SN: "Sénégal",
                    TL: "Timor oriental",
                    TN: "Tunisie",
                    TR: "Turquie",
                    VG: "Îles Vierges britanniques",
                    XK: "République du Kosovo",
                },
                country: "Veuillez fournir un code IBAN valide pour %s",
                default: "Veuillez fournir un code IBAN valide",
            },
            id: {
                countries: {
                    BA: "Bosnie-Herzégovine",
                    BG: "Bulgarie",
                    BR: "Brésil",
                    CH: "Suisse",
                    CL: "Chili",
                    CN: "Chine",
                    CZ: "Tchèque",
                    DK: "Danemark",
                    EE: "Estonie",
                    ES: "Espagne",
                    FI: "Finlande",
                    HR: "Croatie",
                    IE: "Irlande",
                    IS: "Islande",
                    LT: "Lituanie",
                    LV: "Lettonie",
                    ME: "Monténégro",
                    MK: "Macédoine",
                    NL: "Pays-Bas",
                    PL: "Pologne",
                    RO: "Roumanie",
                    RS: "Serbie",
                    SE: "Suède",
                    SI: "Slovénie",
                    SK: "Slovaquie",
                    SM: "Saint-Marin",
                    TH: "Thaïlande",
                    TR: "Turquie",
                    ZA: "Afrique du Sud",
                },
                country: "Veuillez fournir un numéro d'identification valide pour %s",
                default: "Veuillez fournir un numéro d'identification valide",
            },
            identical: {
                default: "Veuillez fournir la même valeur",
            },
            imei: {
                default: "Veuillez fournir un code IMEI valide",
            },
            imo: {
                default: "Veuillez fournir un code IMO valide",
            },
            integer: {
                default: "Veuillez fournir un nombre valide",
            },
            ip: {
                default: "Veuillez fournir une adresse IP valide",
                ipv4: "Veuillez fournir une adresse IPv4 valide",
                ipv6: "Veuillez fournir une adresse IPv6 valide",
            },
            isbn: {
                default: "Veuillez fournir un code ISBN valide",
            },
            isin: {
                default: "Veuillez fournir un code ISIN valide",
            },
            ismn: {
                default: "Veuillez fournir un code ISMN valide",
            },
            issn: {
                default: "Veuillez fournir un code ISSN valide",
            },
            lessThan: {
                default: "Veuillez fournir une valeur inférieure ou égale à %s",
                notInclusive: "Veuillez fournir une valeur inférieure à %s",
            },
            mac: {
                default: "Veuillez fournir une adresse MAC valide",
            },
            meid: {
                default: "Veuillez fournir un code MEID valide",
            },
            notEmpty: {
                default: "Veuillez fournir une valeur",
            },
            numeric: {
                default: "Veuillez fournir une valeur décimale valide",
            },
            phone: {
                countries: {
                    AE: "Émirats Arabes Unis",
                    BG: "Bulgarie",
                    BR: "Brésil",
                    CN: "Chine",
                    CZ: "Tchèque",
                    DE: "Allemagne",
                    DK: "Danemark",
                    ES: "Espagne",
                    FR: "France",
                    GB: "Royaume-Uni",
                    IN: "Inde",
                    MA: "Maroc",
                    NL: "Pays-Bas",
                    PK: "Pakistan",
                    RO: "Roumanie",
                    RU: "Russie",
                    SK: "Slovaquie",
                    TH: "Thaïlande",
                    US: "USA",
                    VE: "Venezuela",
                },
                country: "Veuillez fournir un numéro de téléphone valide pour %s",
                default: "Veuillez fournir un numéro de téléphone valide",
            },
            promise: {
                default: "Veuillez fournir une valeur valide",
            },
            regexp: {
                default: "Veuillez fournir une valeur correspondant au modèle",
            },
            remote: {
                default: "Veuillez fournir une valeur valide",
            },
            rtn: {
                default: "Veuillez fournir un code RTN valide",
            },
            sedol: {
                default: "Veuillez fournir a valid SEDOL number",
            },
            siren: {
                default: "Veuillez fournir un numéro SIREN valide",
            },
            siret: {
                default: "Veuillez fournir un numéro SIRET valide",
            },
            step: {
                default: "Veuillez fournir un écart valide de %s",
            },
            stringCase: {
                default: "Veuillez ne fournir que des caractères minuscules",
                upper: "Veuillez ne fournir que des caractères majuscules",
            },
            stringLength: {
                between: "Veuillez fournir entre %s et %s caractères",
                default: "Veuillez fournir une valeur de longueur valide",
                less: "Veuillez fournir moins de %s caractères",
                more: "Veuillez fournir plus de %s caractères",
            },
            uri: {
                default: "Veuillez fournir un URI valide",
            },
            uuid: {
                default: "Veuillez fournir un UUID valide",
                version: "Veuillez fournir un UUID version %s number",
            },
            vat: {
                countries: {
                    AT: "Autriche",
                    BE: "Belgique",
                    BG: "Bulgarie",
                    BR: "Brésil",
                    CH: "Suisse",
                    CY: "Chypre",
                    CZ: "Tchèque",
                    DE: "Allemagne",
                    DK: "Danemark",
                    EE: "Estonie",
                    EL: "Grèce",
                    ES: "Espagne",
                    FI: "Finlande",
                    FR: "France",
                    GB: "Royaume-Uni",
                    GR: "Grèce",
                    HR: "Croatie",
                    HU: "Hongrie",
                    IE: "Irlande",
                    IS: "Islande",
                    IT: "Italie",
                    LT: "Lituanie",
                    LU: "Luxembourg",
                    LV: "Lettonie",
                    MT: "Malte",
                    NL: "Pays-Bas",
                    NO: "Norvège",
                    PL: "Pologne",
                    PT: "Portugal",
                    RO: "Roumanie",
                    RS: "Serbie",
                    RU: "Russie",
                    SE: "Suède",
                    SI: "Slovénie",
                    SK: "Slovaquie",
                    VE: "Venezuela",
                    ZA: "Afrique du Sud",
                },
                country: "Veuillez fournir un code VAT valide pour %s",
                default: "Veuillez fournir un code VAT valide",
            },
            vin: {
                default: "Veuillez fournir un code VIN valide",
            },
            zipCode: {
                countries: {
                    AT: "Autriche",
                    BG: "Bulgarie",
                    BR: "Brésil",
                    CA: "Canada",
                    CH: "Suisse",
                    CZ: "Tchèque",
                    DE: "Allemagne",
                    DK: "Danemark",
                    ES: "Espagne",
                    FR: "France",
                    GB: "Royaume-Uni",
                    IE: "Irlande",
                    IN: "Inde",
                    IT: "Italie",
                    MA: "Maroc",
                    NL: "Pays-Bas",
                    PL: "Pologne",
                    PT: "Portugal",
                    RO: "Roumanie",
                    RU: "Russie",
                    SE: "Suède",
                    SG: "Singapour",
                    SK: "Slovaquie",
                    US: "USA",
                },
                country: "Veuillez fournir un code postal valide pour %s",
                default: "Veuillez fournir un code postal valide",
            },
        };

        return fr_BE;

    }));
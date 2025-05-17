export const CATEGORIES: any[] = [
    {key: 'demanda', label: 'DEMANDA'},
    {key: 'generacion', label: 'GENERACION'},
    {key: 'almacenamiento', label: 'ALMACENAMIENTO'},
    {key: 'intercambios', label: 'INTERCAMBIOS'},
    {key: 'balance', label: 'BALANCE'},
    {key: 'mercados', label: 'MERCADOS'},
    {key: 'transporte', label: 'TRANSPORTE'}
]

export const WIDGETS: any[] = [
    {key: 'demanda', widgets: [
        {key: 'evolucion', label: 'EVOLUCION', categoryId: 'demanda'},
        {key: 'variacion-componentes', label: 'VARIACION_COMPONENTES', categoryId: 'demanda'},
        {key: 'variacion-componetes-movil', label: 'VARIACION_COMPONENTES_MOVIL', categoryId: 'demanda'},
        {key: 'ire-general', label: 'IRE_GENERAL', categoryId: 'demanda'},
        {key: 'ire-general-anual', label: 'IRE_GENERAL_ANUAL', categoryId: 'demanda'},
        {key: 'ire-general-movil', label: 'IRE_GENERAL_MOVIL', categoryId: 'demanda'},
        {key: 'ire-indusrial-anual', label: 'IRE_INDUSTRIAL_ANUAL', categoryId: 'demanda'},
        {key: 'ire-industrial-movil', label: 'IRE_INDUSTRIAL_MOVIL', categoryId: 'demanda'},
        {key: 'ire-servicios', label: 'IRE_SERVICIOS', categoryId: 'demanda'},
        {key: 'ire-servicios-anual', label: 'IRE_SERVICIOS_ANUAL', categoryId: 'demanda'},
        {key: 'ire-servicios-movil', label: 'IRE_SERVICIOS_MOVIL', categoryId: 'demanda'},
        {key: 'ire-otras', label: 'IRE_OTRAS', categoryId: 'demanda'},
        {key: 'ire-otras-anual', label: 'IRE_OTRAS_ANUAL', categoryId: 'demanda'},
        {key: 'ire-otras-movil', label: 'IRE_OTRAS_MOVIL', categoryId: 'demanda'},
    ]},
    {key: 'generacion', widgets: [
        {key: 'demanda-maxima-diaria', label: 'DEMANDA_MAXIMA_DIARIA', categoryId: 'generacion'},
        {key: 'variacion-maxima-horaria', label: 'VARIACION_MAXIMA_HORARIA', categoryId: 'generacion'},
        {key: 'perdidas-transporte', label: 'PERDIDAS_TRANSPORTE', categoryId: 'generacion'},
        {key: 'potencia-maxima-instantanea', label: 'POTENCIA_MAXIMA_INSTANTANEA', categoryId: 'generacion'},
        {key: 'variacion-demanda', label: 'VARIACION_DEMANDA', categoryId: 'generacion'},
        {key: 'potencia-maxima-instantanea-variacion', label: 'POTENCIA_MAXIMA_INSTANTANEA_VARIACION', categoryId: 'generacion'},
        {key: 'potencia-maxima-instantanea-variacion-historico', label: 'POTENCIA_MAXIMA_INSTANTANEA_VARIACION_HISTORICO', categoryId: 'generacion'},
        {key: 'demanda-tiempo-real', label: 'DEMANDA_TIEMPO_REAL', categoryId: 'generacion'},
        {key: 'variacion-componentes-anual', label: 'VARIACION_COMPONENTES_ANUAL', categoryId: 'generacion'},
        {key: 'estructura-generacion', label: 'ESTRUCTURA_GENERACION', description: 'ESTRUCTURA_GENERACION_DESC', categoryId: 'generacion'},
        {key: 'evolucion-renovable-no-renovable', label: 'EVOLUCION_RENOVABLE_NO_RENOVABLE', categoryId: 'generacion'},
        {key: 'estructura-renovables', label: 'ESTRUCTURA_RENOVABLES', categoryId: 'generacion'},
        {key: 'estructura-generacion-emisiones-asociadas', label: 'ESTRUCTURA_GENERACION_EMISIONES_ASOCIADAS', categoryId: 'generacion'},
        {key: 'evolucion-estructura-generacion-emisiones-asociadas', label: 'EVOLUCION_ESTRUCTURA_GENERACION_EMISIONES_ASOCIADAS', categoryId: 'generacion'},
        {key: 'no-renovables-detalle-emisiones-CO2', label: 'NO_RENOVABLES_DETALLE_EMISIONES_CO2'},
        {key: 'maxima-renovable', label: 'MAXIMA_RENOVABLE', categoryId: 'generacion'},
        {key: 'potencia-instalada', label: 'POTENCIA_INSTALADA', categoryId: 'generacion'},
        {key: 'maxima-renovable-historico', label: 'MAXIMA_RENOVABLE_HISTORICO', categoryId: 'generacion'},
        {key: 'maxima-sin-emisiones-historico', label: 'MAXIMA_SIN_EMISIONES_HISTORICO', categoryId: 'generacion'},
    ]},
    {key: 'almacenamiento', widgets: [
        {key: 'energia-almacenamiento', label: 'ENERGIA_ALMACENAMIENTO', categoryId: 'almacenamiento'},
        {key: 'potencia_instalada', label: 'POTENCIA_INSTALADA', categoryId: 'almacenamiento'},
    ]},    
    {key: 'intercambios', widgets: [
        {key: 'francia-frontera', label: 'FRANCIA_FRONTERA', categoryId: 'intercambios'},
        {key: 'portugal-frontera', label: 'PORTUGAL_FRONTERA', categoryId: 'intercambios'},
        {key: 'marruecos-frontera', label: 'MARRUECOS_FRONTERA', categoryId: 'intercambios'},
        {key: 'andorra-frontera', label: 'ANDORRA_FRONTERA', categoryId: 'intercambios'},
        {key: 'lineas-francia', label: 'LINEAS_FRANCIA', categoryId: 'intercambios'},
        {key: 'lineas-portugal', label: 'LINEAS_PORTUGAL', categoryId: 'intercambios'},
        {key: 'lineas-marruecos', label: 'LINEAS_MARRUECOS', categoryId: 'intercambios'},
        {key: 'lineas-andorra', label: 'LINEAS_ANDORRA', categoryId: 'intercambios'},
        {key: 'francia-frontera-programdas', label: 'FRANCIA_FRONTERA_PROGRAMDAS', categoryId: 'intercambios'},
        {key: 'portugal-frontera-programdas', label: 'PORTUGAL_FRONTERA_PROGRAMDAS', categoryId: 'intercambios'},
        {key: 'marruecos-frontera-programdas', label: 'MARRUECOS_FRONTERA_PROGRAMDAS', categoryId: 'intercambios'},
        {key: 'andorra-frontera-programdas', label: 'ANDORRA_FRONTERA_PROGRAMDAS', categoryId: 'intercambios'},
        {key: 'enlace-baleares', label: 'ENLACE_BALEARES', categoryId: 'intercambios'},
        {key: 'frontera-fisicos', label: 'FRONTERA_FISICOS', categoryId: 'intercambios'},
        {key: 'todas-fronteras-fisicos', label: 'TODAS_FRONTERAS_FISICOS', categoryId: 'intercambios'},
        {key: 'frontera-programados', label: 'FRONTERA_PROGRAMADOS', categoryId: 'intercambios'},
        {key: 'todas-fronteras-programdados', label: 'TODAS_FRONTERAS_PROGRAMADADOS', categoryId: 'intercambios'},
    ]},
    {key: 'transporte', widgets: [
        {key: 'energia-no-suministrada-end', label: 'ENERGIA_NO_SUMINISTRADA_ENS', categoryId: 'transporte'},
        {key: 'indice-indisponibilidad', label: 'INDICE_INDISPONIBILIDAD', categoryId: 'transporte'},
        {key: 'tiempo-interrupcion-medio-tim', label: 'TIEMPO_INTERRUPCION_MEDIO_TIM', categoryId: 'transporte'},
        {key: 'kilometros-lineas', label: 'KILOMETROS_LINEAS', categoryId: 'transporte'},
        {key: 'indice-disponibilidad', label: 'INDICE_DISPONIBILIDAD', categoryId: 'transporte'},
        {key: 'numero-cortes', label: 'NUMERO_CORTES', categoryId: 'transporte'},
        {key: 'ens-tim', label: 'ENS_TIM', categoryId: 'transporte'},
        {key: 'indice-disponibilidad-total', label: 'INDICE_DISPONIBILIDAD_TOTAL', categoryId: 'transporte'},
    ]},
    {key: 'balance', widgets: [
        {key: 'balance-electrico', label: 'BALANCE_ELETRICO', categoryId: 'balance'}
    ]},    
    {key: 'mercados', widgets: [
        {key: 'componentes-precio-energia-cierre-desglose', label: 'COMPONENTES_PRECIO_ENERGIA_CIERRE_DESGLOSE', categoryId: 'mercados'},
        {key: 'componentes-precio', label: 'COMPONENTES_PRECIO', categoryId: 'mercados'},
        {key: 'energia-gestionada-servicios-ajuste', label: 'ENERGIA_GESTIONADA_SERVICIOS_AJUSTE', categoryId: 'mercados'},
        {key: 'energia-restricciones', label: 'ENERGIA_RESTRICCIONES', categoryId: 'mercados'},
        {key: 'precios-restricciones', label: 'PRECIOS_RESTRICCIONES', categoryId: 'mercados'},
        {key: 'reserva-potencia-adicional', label: 'RESERVA_POTENCIA_ADICIONAL', categoryId: 'mercados'},
        {key: 'banda-regulacion-secundaria', label: 'BANDA_REGULACION_SECUNDARIA', categoryId: 'mercados'},
        {key: 'energia-precios-regulacion-secundaria', label: 'ENERGIA_PRECIOS_REGULACION_SECUNDARIA', categoryId: 'mercados'},
        {key: 'energia-precios-regulacion-terciaria', label: 'ENERGIA_PRECIOS_REGULACION_TERCIARIA', categoryId: 'mercados'},
        {key: 'energia-precios-gestion-desvios', label: 'ENERGIA_PRECIOS_GESTION_DESVIOS', categoryId: 'mercados'},
        {key: 'coste-servicios-ajuste', label: 'COSTE_SERVICIOS_AJUSTE', categoryId: 'mercados'},
        {key: 'volumen-energia-servicios-ajuste-variacion', label: 'VOLUMEN_ENERGIA_SERVICIOS_AJUSTE_VARIACION', categoryId: 'mercados'},
        {key: 'precios-mercados-tiempo-real', label: 'PRECIOS_MERCADOS_TIEMPO_REAL', categoryId: 'mercados'},
        {key: 'energia-precios-ponderados-gestion-desvios-before', label: 'ENERGIA_PRECIOS_PONDERADOS_GESTION_DESVIOS_BEFORE', categoryId: 'mercados'},
        {key: 'energia-precios-ponderados-gestion-desvios', label: 'ENERGIA_PRECIOS_PONDERADOS_GESTION_DESVIOS', categoryId: 'mercados'},
        {key: 'energia-precios-ponderados-gestion-desvios-after', label: 'ENERGIA_PRECIOS_PONDERADOS_GESTION_DESVIOS_AFTER', categoryId: 'mercados'},
    ]},                      
]    

export const GEO_TRUNCS: any[] = [
    {key: 'electric_system', label: 'ELECTRIC_SYSTEM'},
]

export const GEO_TYPES: any[] = [
    {key: 'sistema_electrico', label: 'SISTEMA_ELECTRICO'},
    {key: 'comunidades_autonomas', label: 'COMUNIDADES_AUTONOMNAS'}
]

export const GEO_LIMITS: any[] = [
    {key: 'peninsular', label: 'PENINSULAR', geoId: 8741},
    {key: 'canarias', label: 'CANARIAS', geoId: 8742},
    {key: 'baleares', label: 'BALEARES', geoId: 8743},
    {key: 'ceuta', label: 'CEUTA', geoId: 8744},
    {key: 'melilla', label: 'MELILLA', geoId: 8745},
    {key: 'ccaa', label: 'CCAA', regions: [
        { key: "todas", label: "Todas las comunidades", geoId: 4 },
        { key: "andalucia", label: "Andalucía", geoId: 4 },
        { key: "aragon", label: "Aragón", geoId: 5 },
        { key: "cantabria", label: "Cantabría", geoId: 6 },
        { key: "castilla_mancha", label: "Castilla la Mancha", geoId: 7 },
        { key: "castilla_leon", label: "Castilla León", geoId: 8 },
        { key: "cataluna", label: "Cataluña", geoId: 9},
        { key: "pais_vasco", label: "País Vasco", geoId: 10 },
        { key: "asturias", label: "Principado de Asturias", geoId: 11 },
        { key: "comunidad_ceuta", label: "Comunidad de Ceuta", geoId: 8744 },
        { key: "comunidad_melilla", label: "Comunidad de Melilla", geoId: 8745 },
        { key: "comunidad_madrid", label: "Comunidad de Madrid", geoId: 13 },
        { key: "comunidad_navarra", label: "Comunidad de Navarra", eoId: 14 },
        { key: "comunidad_valencia", label: "Comunidad de Valencia", geoId: 15 },
        { key: "extremadura", label: "Extremadura", geoId: 16 },
        { key: "galicia", label: "Galicia", geoId: 17 },
        { key: "islas_baleares", label: "Islas Baleares", geoId: 8743 },
        { key: "islas_canarias", label: "Islas Canarias", geoId: 8742 },
        { key: "la_rioja", label: "La Rioja", geoId: 20},
        { key: "regios_murcia", label: "Región de Murcia", geoId: 21 },
    ]},
]

export const TIME_TRUNCS: any[] = [
    {key: 'day', label: 'DAYS'},
    {key: 'month', label: 'MONTHS'},
    {key: 'year', label: 'YEARS'},
]

export const TECHNOLOGIES: any[] = [
    {key: 'Hidráulica', label: 'HYDRAULIC'},
    {key: 'Nuclear', label: 'NUCLEAR'},
    {key: 'Carbón', label: 'COAL'},
    {key: 'Motores diésel', label: 'DIESEL_ENGINE'},
    {key: 'Turbina de gas', label: 'GAS_TURBINE'},
    {key: 'Turbina de vapor', label: 'STEAM_TURBINE'},
    {key: 'Ciclo combinado', label: 'COMBINED_CYCLE'},
    {key: 'Hidroeólica', label: 'HYDROWIND'},
    {key: 'Eólica', label: 'WIND'},
    {key: 'Solar Photovoltaic', label: 'SOLAR_PHOTOVOLTAIC'},
    {key: 'Solar Thermal"', label: 'SOLAR_THERMAL'},
    {key: 'Other Renewables', label: 'OTHER_RENEWABLES'},
    {key: 'Cogeneration', label: 'COGENERATION'},
    {key: 'Non-Renewable', label: 'NON_RENEWABLE'},
    {key: 'Renewable Waste', label: 'WASTE_RENEWABLE'},
    {key: 'Total Generation', label: 'TOTAL_GENERATION'},
];

export const TYPES: any[] = [
    {key: 'Renovable', label: 'RENOVABLE'},
    {key: 'No-Renovable', label: 'NO_RENEWABLE'},
    {key: 'Generación total', label: 'TOTAL_GENERATION'}
];
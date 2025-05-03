export const LANG: any[] = [
    {key: 'es', label: 'ES'},
    {key: 'en', label: 'EN'},
]

export const CATEGORIES: any[] = [
    {key: 'balance', label: 'BALANCE'},
    {key: 'demanda', label: 'DEMANDA'},
    {key: 'generacion', label: 'GENERACION'},
    {key: 'intercambios', label: 'INTERCAMBIOS'},
    {key: 'transporte', label: 'TRANSPORTE'},
    {key: 'mercados', label: 'MERCADOS'},
]

export const WIDGETS: any[] = [
    {key: 'balance', widgets: [
        {key: 'balance-electrico', label: 'BALANCE_ELETRCICO'}
    ]},
    {key: 'demanda', widgets: [
        {key: 'evolucion', label: 'EVOLUCION'},
        {key: 'variacion-componentes', label: 'VARAICION_COMPONENTES'},
        {key: 'variacion-componetes-movil', label: 'VARAICION_COMPONENTES_MOVIL'},
        {key: 'ire-general', label: 'IRE_GENERAL'},
        {key: 'ire-general-anual', label: 'IRE_GENERAL_ANUAL'},
        {key: 'ire-general-movil', label: 'IRE_GENERAL_MOVIL'},
        {key: 'ire-indusrial-anual', label: 'IRE_INDUSTRIAL_ANUAL'},
        {key: 'ire-industrial-movil', label: 'IRE_INDUSTRIAL_MOVIL'},
        {key: 'ire-servicios', label: 'IRE_SERVICIOS'},
        {key: 'ire-servicios-anual', label: 'IRE_SERVICIOS_ANUAL'},
        {key: 'ire-servicios-movil', label: 'IRE_SERVICIOS_MOVIL'},
        {key: 'ire-otras', label: 'IRE_OTRAS'},
        {key: 'ire-otras-anual', label: 'IRE_OTRAS_ANUAL'},
        {key: 'ire-otras-movil', label: 'IRE_OTRAS_MOVIL'},
    ]},
    {key: 'generacion', widgets: [
        {key: 'demanda-maxima-diaria', label: 'DEMANDA_MAXIMA_DIARIA'},
        {key: 'variacion-maxima-horaria', label: 'VARIACION_MAXIMA_HORARIA'},
        {key: 'perdidas-transporte', label: 'PERDIDAS_TRANSPORTE'},
        {key: 'potencia-maxima-instantanea', label: 'POTENCIA_MAXIMA_INSTANTANEA'},
        {key: 'variacion-demanda', label: 'VARIACION_DEMANDA'},
        {key: 'potencia-maxima-instantanea-variacion', label: 'POTENCIA_MAXIMA_INSTANTANEA_VARIACION'},
        {key: 'potencia-maxima-instantanea-variacion-historico', label: 'POTENCIA_MAXIMA_INSTANTANEA_VARIACION_HISTORICO'},
        {key: 'demanda-tiempo-real', label: 'DEMANDA_TIEMPO_REAL'},
        {key: 'variacion-componentes-anual', label: 'VARIACION_COMPONENTES_ANUAL'},
        {key: 'estructura-generacion', label: 'ESTRUCTURA_GENERACION'},
        {key: 'evolucion-renovable-no-renovable', label: 'EVOLUCION_RENOVABLE_NO_RENOVABLE'},
        {key: 'estructura-renovables', label: 'ESTRUCTURA_RENOVABLES'},
        {key: 'estructura-generacion-emisiones-asociadas', label: 'ESTRUCTURA_GENERACION_EMISIONES_ASOCIADAS'},
        {key: 'evolucion-estructura-generacion-emisiones-asociadas', label: 'EVOLUCION_ESTRUCTURA_GENERACION_EMISIONES_ASOCIADAS'},
        {key: 'no-renovables-detalle-emisiones-CO2', label: 'NO_RENOVABLES_DETALLE_EMISIONES_CO2'},
        {key: 'maxima-renovable', label: 'MAXIMA_RENOVABLE'},
        {key: 'potencia-instalada', label: 'POTENCIA_INSTALADA'},
        {key: 'maxima-renovable-historico', label: 'MAXIMA_RENOVABLE_HISTORICO'},
        {key: 'maxima-sin-emisiones-historico', label: 'MAXIMA_SIN_EMISIONES_HISTORICO'},
    ]},
    {key: 'intercambios', widgets: [
        {key: 'francia-frontera', label: 'FRANCIA_FRONTERA'},
        {key: 'portugal-frontera', label: 'PORTUGAL_FRONTERA'},
        {key: 'marruecos-frontera', label: 'MARRUECOS_FRONTERA'},
        {key: 'andorra-frontera', label: 'ANDORRA_FRONTERA'},
        {key: 'lineas-francia', label: 'LINEAS_FRANCIA'},
        {key: 'lineas-portugal', label: 'LINEAS_PORTUGAL'},
        {key: 'lineas-marruecos', label: 'LINEAS_MARRUECOS'},
        {key: 'lineas-andorra', label: 'LINEAS_ANDORRA'},
        {key: 'francia-frontera-programdas', label: 'FRANCIA_FRONTERA_PROGRAMDAS'},
        {key: 'portugal-frontera-programdas', label: 'PORTUGAL_FRONTERA_PROGRAMDAS'},
        {key: 'marruecos-frontera-programdas', label: 'MARRUECOS_FRONTERA_PROGRAMDAS'},
        {key: 'andorra-frontera-programdas', label: 'ANDORRA_FRONTERA_PROGRAMDAS'},
        {key: 'enlace-baleares', label: 'ENLACE_BALEARES'},
        {key: 'frontera-fisicos', label: 'FRONTERA_FISICOS'},
        {key: 'todas-fronteras-fisicos', label: 'TODAS_FRONTERAS_FISICOS'},
        {key: 'frontera-programados', label: 'FRONTERA_PROGRAMADOS'},
        {key: 'todas-fronteras-programdados', label: 'TODAS_FRONTERAS_PROGRAMDADOS'},
    ]},
    {key: 'transporte', widgets: [
        {key: 'energia-no-suministrada-end', label: 'ENERGIA_NO_SUMINISTRADA_END'},
        {key: 'indice-indisponibilidad', label: 'INDICE_INDISPONIBILIDAD'},
        {key: 'tiempo-interrupcion-medio-tim', label: 'TIEMPO_INTERRUPCION_MEDIO_TIM'},
        {key: 'kilometros-lineas', label: 'KILOMETROS_LINEAS'},
        {key: 'indice-disponibilidad', label: 'INDICE_DISPONIBILIDAD'},
        {key: 'numero-cortes', label: 'NUMERO_CORTES'},
        {key: 'ens-tim', label: 'ENS_TIM'},
        {key: 'indice-disponibilidad-total', label: 'INDICE_DISPONIBILIDAD_TOTAL'},
    ]},
    {key: 'mercados', widgets: [
        {key: 'componentes-precio-energia-cierre-desglose', label: 'COMPONENTES_PRECIO_ENERGIA_CIERRE_DESGLOSE'},
        {key: 'componentes-precio', label: 'COMPONENTES_PRECIO'},
        {key: 'energia-gestionada-servicios-ajuste', label: 'ENERGIA_GESTIONADA_SERVICIOS_AJUSTE'},
        {key: 'energia-restricciones', label: 'ENERGIA_RESTRICCIONES'},
        {key: 'precios-restricciones', label: 'PRECIOS_RESTRICCIONES'},
        {key: 'reserva-potencia-adicional', label: 'RESERVA_POTENCIA_ADICIONAL'},
        {key: 'banda-regulacion-secundaria', label: 'BANDA_REGULACION_SECUNDARIA'},
        {key: 'energia-precios-regulacion-secundaria', label: 'ENERGIA_PRECIOS_REGULACION_SECUNDARIA'},
        {key: 'energia-precios-regulacion-terciaria', label: 'ENERGIA_PRECIOS_REGULACION_TERCIARIA'},
        {key: 'energia-precios-gestion-desvios', label: 'ENERGIA_PRECIOS_GESTION_DESVIOS'},
        {key: 'coste-servicios-ajuste', label: 'COSTE_SERVICIOS_AJUSTE'},
        {key: 'volumen-energia-servicios-ajuste-variacion', label: 'VOLUMEN_ENERGIA_SERVICIOS_AJUSTE_VARIACION'},
        {key: 'precios-mercados-tiempo-real', label: 'PRECIOS_MERCADOS_TIEMPO_REAL'},
        {key: 'energia-precios-ponderados-gestion-desvios-before', label: 'ENERGIA_PRECIOS_PONDERADOS_GESTION_DESVIOS_BEFORE'},
        {key: 'energia-precios-ponderados-gestion-desvios', label: 'ENERGIA_PRECIOS_PONDERADOS_GESTION_DESVIOS'},
        {key: 'energia-precios-ponderados-gestion-desvios-after', label: 'ENERGIA_PRECIOS_PONDERADOS_GESTION_DESVIOS_AFTER'},
    ]},                      
]    

export const TIME_TRUNCS: any[] = [
    {key: 'hour', label: 'HOURS'},
    {key: 'day', label: 'DAYS'},
    {key: 'month', label: 'MONTHS'},
    {key: 'year', label: 'YEARS'},
]

export const GEO_TRUNCS: any[] = [
    {key: 'electric_system', label: 'ELECTRIC_SYSTEM'},
]

export const GEO_LIMITS: any[] = [
    {key: 'peninsular', label: 'PENINSULAR'},
    {key: 'canarias', label: 'CANARIAS'},
    {key: 'baleares', label: 'BALEARES'},
    {key: 'ceuta', label: 'CEUTA'},
    {key: 'melilla', label: 'MELILLA'},
    {key: 'ccaa', label: 'CCAA'},
]

export const GROUPS: any[] = [
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
import {
   INIT_POSITIONS_LIST,
   RESET_POSITIONS_LIST,
   SET_NEW_POSITION_INFO,
   SET_POSITION_ID,
   SET_POSITION_NAME,
   SET_POSITIONS_LIST_FAILED,
   SET_POSITIONS_LIST_SUCCESS
} from "@store/types";

const initialState = {
   info: null,
   loading: false,
   error: null,
   list: null,
   name: null,
   id: null
   
   // info: {
   //    department_name: 'SMM интернет маркетинг',
   //    manager_position: null,
   //    manager_surname: null,
   //    manager_name: null,
   //    manager_middle_name: null,
   //    address: [
   //       {
   //          city_name: 'Тернополь',
   //          street_name: 'вул. Дружби',
   //          street_number: '2',
   //          city_id: '23147',
   //          street_id: '0a10563a-6858-11e6-8304-00505688561d'
   //       }
   //    ],
   //    s_activity: {
   //       name: 'Группа компаний',
   //       idItem: '33',
   //       type: 'global'
   //    },
   //    name: 'SMM-менеджер',
   //    level: {
   //       name: 'Уровень A',
   //       idItem: '2',
   //       type: 'global'
   //    },
   //    functionality: [
   //       {
   //          id: '2849',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Анализировать детельность конкурентов',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2856',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Анализировать поведение посетителей',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2848',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Анализировать тематику сайта, компании, или продукта',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2850',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Анализировать целевую аудиторию',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2859',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Организовывать различные рекламные кампании на иных платформах создавать медиа-контент для привлечения посетителей',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2858',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Отслеживать поток посетителей и клиентов внутри сайта',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2857',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Оценивать рентабельность рекламных кампаний',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2854',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Писать рекламные объявления',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2851',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Подбирать ключевые слова для кампаний',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2852',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Работать с рекламными бюджетами',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2853',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Разрабатывать стратегию рекламных компаний',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2860',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Снижать цену за клик/переход/конкретное действие для своего клиента повысить конверсию',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2855',
   //          id_dep: '2',
   //          id_list: '10',
   //          name: 'Управлять бюджетом рекламных компаний',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       }
   //    ],
   //    subordinates_type: 'Да',
   //    subordinates_number: '23',
   //    address_vacancy: [
   //       {
   //          city_name: 'Тернополь',
   //          street_name: 'вул. Дружби',
   //          street_number: '2',
   //          city_id: '23147',
   //          street_id: '0a10563a-6858-11e6-8304-00505688561d'
   //       }
   //    ],
   //    employment_type: {
   //       name: 'Гибкий/свободный график',
   //       idItem: '3',
   //       type: 'global'
   //    },
   //    work_time: {
   //       from: '07:00',
   //       to: '18:00'
   //    },
   //    salary: {
   //       from: '15000',
   //       to: '30000'
   //    },
   //    target: [
   //       {
   //          id: '758',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Лидогенерация — обеспечение входящих заявок / первичного касания с клиентом.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '759',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Обеспечение реальных транзакций и целевых действий.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '760',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Повышение показателей охвата / вовлеченности — увеличение числа уникальных пользователей, которые увидят рекламное сообщение и повышение активности на странице в социальных сетях.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '756',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Повышение узнаваемости бренда.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '757',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Привлечение трафика на сайт.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '761',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Увеличение дохода и сокращение расхода на рекламу \n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '755',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Продвижение компании, бренда или продукта в социальных сетях\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       }
   //    ],
   //    result: [
   //       {
   //          id: '750',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Активные   входящие заявки.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '753',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Доход увеличен\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '751',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Обеспечены реальные транзакции и целевые действия.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '752',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Повышены показатели охвата / вовлеченности — увеличено число уникальных пользователей, которые видят рекламное сообщение и повышена активность на странице в социальных сетях.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '749',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Привлечение трафика на сайт.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '748',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: ' Узнаваемость бренда на нужном уровне.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '747',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Компания, бренд, или продукт узнаваемый, раскрученный в социальных сетях.\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '754',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Расход на рекламу сокращен\n',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       }
   //    ],
   //    kpi: [
   //       {
   //          id: '1157',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Достижение конверсий / числа обращений — фактическая реализация целевого действия: от продаж, до регистраций.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '1161',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Рост UGC (User-Generated Content) — увеличение числа контента, которые генерируют пользователи.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '1158',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Рост активного ядра — увеличение упоминаний о проекте на внутренних и внешних площадках.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '1159',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Рост вовлеченности и общей активности на страницах — увеличение показателя ER в социальных сетях.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '1155',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Рост охвата — увеличение числа уникальных пользователей, которые увидели рекламное сообщение.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '1156',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Рост посещаемости группы / посадочных страниц — увеличение трафика на целевых страницах.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '1160',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Рост узнаваемости — повышение показателя узнаваемости и запоминаемости бренда.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '1154',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Рост числа подписчиков / участников сообщества — увеличение числа фанов, которые будут следить за деятельностью проекта в социальных сетях.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       }
   //    ],
   //    credentials: 'Делегировать свои полномочия',
   //    interaction: [
   //       'BTL-менеджер',
   //       'CRM администратор'
   //    ],
   //    opportunities: null,
   //    education: {
   //       name: 'Высшее',
   //       idItem: '1',
   //       type: 'global'
   //    },
   //    zun: [
   //       {
   //          id: '2064',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Аналитический склад ума;',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2070',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Знание аналитических инструментов, позволяющих анализировать пользователей социальных сетей, отслеживать эффективность рекламных кампаний, измерять охват и другие показатели.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2069',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Знание инструментов автоматизации в социальных сетях;',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2065',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Знание особенностей социальных сетей, их аудиторий, технологий, правил;',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2067',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Умение использовать рекламные инструменты, предлагаемые социальными сетями. В частности, системы таргетированной рекламы, промо посты.',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2063',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Умение понимать людей и общаться с ними;',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2068',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Умение привлекать аудиторию из социальных сетей на сайт заказчика;',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       },
   //       {
   //          id: '2066',
   //          id_dep: '1',
   //          id_list: '10',
   //          name: 'Умение создавать интересный контент, который понравится людям;',
   //          type: 'global',
   //          selected: true,
   //          isUserAdd: false
   //       }
   //    ],
   //    competencies: [
   //       {
   //          name: 'Инициативность',
   //          idItem: '8',
   //          type: 'global'
   //       },
   //       {
   //          name: 'Лидерство',
   //          idItem: '9',
   //          type: 'global'
   //       },
   //       {
   //          name: 'Ответственность',
   //          idItem: '3',
   //          type: 'global'
   //       },
   //       {
   //          name: 'Проффесионализм',
   //          idItem: '1',
   //          type: 'global'
   //       },
   //       {
   //          name: 'Результативность',
   //          idItem: '2',
   //          type: 'global'
   //       }
   //    ],
   //    programs: [
   //       {
   //          name: 'WebStorm',
   //          levels: 'Продвинутый',
   //          id: '472'
   //       }
   //    ],
   //    languages: [
   //       {
   //          name: 'Английский',
   //          levels: 'Intermediate — B1',
   //          id: '473'
   //       }
   //    ],
   //    driver_license: 'Да',
   //    driver_categories: [],
   //    driving_experience: null,
   //    car_available: null,
   //    compensation_package: [],
   //    missions: null,
   //    dress_code: null,
   //    work_process: null,
   //    work_place: null,
   //    customer_communications: null,
   //    supervisor_communications: null,
   //    gender: null,
   //    family_status: null,
   //    kids: null,
   //    universities: [],
   //    courses: [],
   //    experience: null,
   //    experience_company_names: null,
   //    experience_job_titles: null,
   //    cases: [],
   //    military_service: null,
   //    hobbies: [],
   //    personal_qualities: []
   // },
   // loading: false,
   // error: null,
   // list: [
   //    {
   //       id: '224',
   //       id_d: '1',
   //       id_list: '10',
   //       name: 'SMM-менеджер',
   //       type: 'global'
   //    },
   //    {
   //       id: '225',
   //       id_d: '2',
   //       id_list: '10',
   //       name: 'Специалист по контекстной рекламе (PPC)',
   //       type: 'global'
   //    },
   //    {
   //       id: '226',
   //       id_d: '3',
   //       id_list: '10',
   //       name: 'PPC-стратег',
   //       type: 'global'
   //    }
   // ],
   // name: null,
   // id: '224'
}

const handlers = {
   [INIT_POSITIONS_LIST]: state => ({...state, loading: true,}),
   [RESET_POSITIONS_LIST]: () => ({info: null, loading: false, error: null, list: null, name: null, id: null}),
   [SET_POSITIONS_LIST_SUCCESS]: (state, {payload}) => ({...state, loading: false, list: payload}),
   [SET_POSITIONS_LIST_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [SET_POSITION_NAME]: (state, {payload}) => ({...state, name: payload}),
   [SET_POSITION_ID]: (state, {payload}) => ({...state, id: payload}),
   [SET_NEW_POSITION_INFO]: (state, {payload}) => ({...state, info: payload}),
   
   DEFAULT: state => state
}

export const positionsListReducer = (state = initialState, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}
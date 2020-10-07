// import { action, observable } from 'mobx'
// import Sockette from 'sockette'
// import mobxRemotedev from 'mobx-remotedev'
// import moment from 'moment'

// import URLS from 'constants/urls'
// import { getRandomInt } from 'services/utilities'
// import { ApiService, GoogleAnalytics, Tracker } from 'services'
// import { ERROR_CODES } from 'constants/sportsbook'

// @mobxRemotedev({ onlyActions: true })
// class BetconstructStore {
//   @observable connectionStatus = false

//   @observable selectedSport = 1 // UI - default = 1 = football
//   @observable selectedRegion = 0 // UI
//   @observable selectedCompetition = 0 // UI
//   @observable selectedGame = 0 // UI
//   @observable sideMenuTab = 'PREMATCH' // the side menu tabs handler
//   @observable loadedSport = 1 // to track what's loaded (for odds purposes)
//   @observable loadedCompetition = 0 // Screen to show matches from competition (SportMatchesList)
//   @observable loadedGame = 0 // Screen to show the game odds (GameDetails)
//   @observable configs = null
//   @observable bannerLoaded = false

//   @observable remountIfConnectionChange = false

//   SessionStore = null
//   TranslationStore = null

//   websocket = null
//   getBalanceKeepAlive = null

//   initCallbacks = []
//   websocketCallbacks = []
//   websocketSubscriptions = []
//   isLogged = false

//   /**
//    * @param SessionStore class
//    * @description inject the session store into
//    */
//   injectSessionStore = (SessionStore) => {
//     this.SessionStore = SessionStore
//   }

//   /**
//    * @param injectBettingSlipStore class
//    * @description inject the bet slip store
//    */
//   injectBettingSlipStore = (BettingSlipStore) => {
//     this.BettingSlipStore = BettingSlipStore
//   }

//   /**
//    * @description used to inject the translationStore store here, avoid circular problem
//    */
//   injectTranslationStore = (TranslationStore) => {
//     this.TranslationStore = TranslationStore

//     if (!this.websocket) this.initWebsocketConnection()
//   }

//   /**
//    * @params callback function
//    * @description inject callback to execute after ws connect, or instant if already connected
//    */
//   injectInitCallback = (callback) => {
//     if (this.connectionStatus) {
//       callback()
//     } else {
//       this.initCallbacks = this.initCallbacks || []
//       this.initCallbacks.push(callback)
//     }
//   }

//   /**
//    * @description prepare websocket message and set the callback for it
//    * @return function to remove from callbacks list
//    */
//   sendWebsocketMessage = (command, data = {}, callback) => {
//     if (command !== 'request_session' && !this.connectionStatus) {
//       this.injectInitCallback(() =>
//         this.sendWebsocketMessage(command, data, callback)
//       )

//       return null
//     }

//     const randomNumber = Date.now() + getRandomInt(0, 100000)
//     const rid = `${data.rid || command}_${randomNumber}`

//     const message = JSON.stringify({ command, ...data, rid })

//     let websocketCallback = callback
//     if (typeof callback === 'function') {
//       websocketCallback = { responseCallback: callback }
//     }

//     this.websocketCallbacks.push({ rid, ...websocketCallback })
//     this.websocket.send(message)

//     Tracker.sendBcRequest(command, { rid, ...data })

//     return () => {
//       this.websocketCallbacks = this.websocketCallbacks.filter(
//         (registeredCallback) =>
//           registeredCallback.responseCallback !==
//           websocketCallback.responseCallback
//       )

//       const subscription = this.websocketSubscriptions.find(
//         (websocketSubscription) =>
//           websocketSubscription.updatesCallback ===
//           websocketCallback.updatesCallback
//       )

//       if (subscription) {
//         this.websocketSubscriptions = this.websocketSubscriptions.filter(
//           (websocketSubscription) =>
//             websocketSubscription.updatesCallback !==
//             websocketCallback.updatesCallback
//         )

//         this.sendWebsocketMessage('unsubscribe', {
//           params: { subid: subscription.subid },
//         })
//       }
//     }
//   }

//   /**
//    * @param {boolean} loaded
//    * @description setter to indicate the sportsbook banners are loaded
//    */
//   @action setBannerLoaded = (loaded = true) => {
//     this.bannerLoaded = loaded
//   }

//   /**
//    * Request any kind of information from BC
//    * @param {object} what
//    * @param {object} where
//    * @param {function} responseCallback
//    * @param {function} updatesCallback
//    * @return function to remove from callbacks list
//    */
//   @action requestGet = (what, where, responseCallback, updatesCallback) => {
//     const data = {
//       rid: 'request_get',
//       params: {
//         source: 'betting',
//         what,
//         where,
//         subscribe: Boolean(updatesCallback),
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback,
//     })
//   }

//   /**
//    * @description get the minimum bet amount based on current player currency or default value
//    */
//   getMinBetAmount = () => {
//     const { isLogged, details } = this.SessionStore.player

//     const defaultValue = 0.1

//     if (this.configs) {
//       if (isLogged) {
//         return (
//           Number(this.configs.min_bet_stakes[details.currency_iso_code]) ||
//           defaultValue
//         )
//       }

//       return this.configs.min_bet_stakes.EUR || defaultValue
//     }

//     return defaultValue
//   }

//   /**
//    * @description Config and initialize Websocket connection with BetConstruct
//    */
//   @action initWebsocketConnection = () => {
//     this.websocket = new Sockette(
//       process.env.REACT_APP_BET_CONSTRUCT_WEBSOCKET_URL,
//       {
//         timeout: 5000,
//         maxAttempts: 10,
//         onopen: this.onOpen,
//         onmessage: this.onMessage,
//         onclose: this.onClose,
//         onerror: this.onError,
//         onmaximum: this.onMaximum,
//       }
//     )
//   }

//   /**
//    * @description Websocket Lifecycle function triggered after the connection was established
//    */
//   @action onOpen = () => {
//     this.stopKeepAlive()

//     this.requestSession()
//   }

//   /**
//    * @param event object
//    * @description Websocket Lifecycle function triggered after the connection was closed
//    */
//   @action onClose = (error) => {
//     GoogleAnalytics.sendError({
//       file: 'BetconstructStore',
//       method: 'onClose',
//       error,
//     })

//     this.connectionStatus = false

//     this.isLogged = false
//   }

//   /**
//    * @param error object
//    * @description Websocket Lifecycle function triggered if the connection throw error
//    */
//   @action onError = (error) => {
//     GoogleAnalytics.sendError({
//       file: 'BetconstructStore',
//       method: 'onError',
//       error,
//     })
//   }

//   /**
//    * @param event object
//    * @description Websocket Lifecycle function triggered after the connection was reached at maximum
//    */
//   @action onMaximum = (error) => {
//     GoogleAnalytics.sendError({
//       file: 'BetconstructStore',
//       method: 'onMaximum',
//       error,
//     })

//     this.connectionStatus = false
//   }

//   /**
//    * @description Request Betconstruct Websocket Session
//    * @return function to remove from callbacks list
//    */
//   @action requestSession = () => {
//     const data = {
//       params: {
//         language: this.TranslationStore.getBetConstructLanguage(),
//         site_id: process.env.REACT_APP_BET_CONSTRUCT_SITE_ID,
//       },
//     }

//     return this.sendWebsocketMessage(
//       'request_session',
//       data,
//       this.sessionCallback
//     )
//   }

//   /**
//    * @description Request Betconstruct partner config with some frontend used values
//    * @return function to remove from callbacks list
//    */
//   @action requestConfigs = () => {
//     const data = {
//       rid: 'request_configs',
//       params: {
//         source: 'partner.config',
//         what: { partner: [] },
//         subscribe: true,
//       },
//     }

//     const callback = {
//       responseCallback: this.configsCallback,
//       updatesCallback: this.configsCallback,
//     }

//     return this.sendWebsocketMessage('get', data, callback)
//   }

//   /**
//    * @description Create bet construct user session using WebSockets
//    * @return function to remove from callbacks list
//    */
//   @action requestUserSession = () => {
//     if (
//       process.env.NODE_ENV === 'development' &&
//       process.env.REACT_APP_API_URL.includes('localhost')
//     ) {
//       // eslint-disable-next-line
//       console.error(
//         "BETCONSTRUCT: We don't login the player on ws if is dev with local backend"
//       )

//       return null
//     }

//     const data = {
//       params: {
//         user_id: this.SessionStore.player.details.id,
//         auth_token: this.SessionStore.player.session.session_token,
//       },
//     }

//     return this.sendWebsocketMessage('restore_login', data, (result) => {
//       this.isLogged = true
//       return this.SessionStore.betconstructKeepAlive(result)
//     })
//   }

//   /**
//    * @description Request Betconstruct Websocket remove the user Session
//    * @return function to remove from callbacks list
//    */
//   @action requestUserLogout = () => {
//     this.stopKeepAlive()

//     return this.sendWebsocketMessage('logout')
//   }

//   /**
//    * @param id string
//    * @param params object
//    * @param responseCallback function
//    * @param updatesCallback function
//    * @description do the bet on bc
//    * @return function to remove from callbacks list
//    */
//   @action requestDoBet = (id, params, responseCallback, updatesCallback) => {
//     const data = {
//       rid: `request_do_bet_${id}`,
//       params: {
//         ...params,
//         mode: 1,
//       },
//     }

//     return this.sendWebsocketMessage('do_bet', data, {
//       responseCallback,
//       updatesCallback,
//     })
//   }

//   /**
//    * Request to do boosted bets
//    */
//   @action requestDoBoostedBet = async ({
//     value,
//     competition,
//     game,
//     event,
//     odds,
//   }) => {
//     const minAmount = this.getMinBetAmount()

//     await this.boostBet({
//       boostedBet: {
//         boostAmount: value - minAmount,
//         minAmount,
//         competitionId: competition.id,
//         matchId: game.id,
//         eventId: event.id,
//         boostOdds: odds,
//       },
//     })

//     return new Promise((resolve) => {
//       this.requestDoBet(
//         event.id,
//         {
//           type: 1,
//           mode: 0,
//           amount: minAmount,
//           bets: [
//             {
//               price: event.price,
//               event_id: event.id,
//             },
//           ],
//         },
//         (result) => {
//           if (result.data.result === 'OK') {
//             this.SessionStore.updateBalance()
//           }

//           resolve(result)
//         }
//       )
//     })
//   }

//   /**
//    * Request to do PremadeBets
//    */
//   @action requestDoPremadeBets = async (bets, premadeStake) => {
//     await this.preparePremade({
//       premadeBet: {
//         premadeStake,
//         eventIds: bets.map((bet) => bet.event.id),
//       },
//     })

//     const multiBet = {
//       type: 2,
//       mode: 0,
//       amount: premadeStake,
//       bets: bets.map((bet) => ({
//         price: bet.event.price,
//         event_id: bet.event.id,
//       })),
//     }

//     return new Promise((resolve, reject) => {
//       this.requestDoBet(bets[0].event.id, multiBet, (result) => {
//         if (result.data.result !== 'OK') {
//           reject(result)
//         }

//         this.SessionStore.updateBalance()

//         resolve(result)
//       })
//     })
//   }

//   /**
//    * @param responseCallback function
//    * @param updatesCallback function
//    * @description get live games with details
//    * @return function to remove from callbacks list
//    */
//   @action requestLiveGames = (responseCallback, updatesCallback) => {
//     const data = {
//       rid: 'request_live_games',
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['id', 'name', 'order'],
//           region: ['id', 'name'],
//           competition: ['id', 'name', 'order'],
//           game: [
//             'id',
//             'team1_name',
//             'team2_name',
//             'start_ts',
//             'info',
//             'match_length',
//             'text_info',
//           ],
//         },
//         where: { game: { type: 1 } },
//         subscribe: Boolean(updatesCallback),
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback,
//     })
//   }

//   /**
//    * @param responseCallback function
//    * @param updatesCallback function
//    * @description get sports with details
//    * @return function to remove from callbacks list
//    */
//   @action requestSports = (responseCallback, updatesCallback, where) => {
//     if (!where) {
//       where = {
//         game: {
//           '@or': [
//             { type: { '@in': [0, 2] } },
//             { visible_in_prematch: 1, type: 1 },
//           ],
//         },
//       }
//     }

//     where.game = where.game || {}
//     where.game.is_blocked = 0

//     const data = {
//       rid: 'request_sports',
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['id', 'name', 'order'],
//           game: '@count',
//         },
//         where,
//         subscribe: Boolean(updatesCallback),
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback,
//     })
//   }

//   /**
//    * Request the sports with live matches
//    * @param responseCallback function
//    * @param updatesCallback function
//    * @return function to remove from callbacks list
//    */
//   @action requestLiveSports = (responseCallback, updatesCallback) => {
//     const where = { game: { type: 1 } }

//     return this.requestSports(responseCallback, updatesCallback, where)
//   }

//   /**
//    * @param id string
//    * @param callback function
//    * @description request game details by id
//    * @return function to remove from callbacks list
//    */
//   @action requestGetGameId = (
//     id,
//     responseCallback,
//     updatesCallback,
//     options = {}
//   ) => {
//     let { where, what } = options

//     what = what || {}

//     where = where || {}
//     where.game = where.game || {}
//     where.game.id = id

//     const data = {
//       rid: `request_get_game_id_${id}`,
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['id', 'name'],
//           region: ['id', 'name'],
//           competition: ['id', 'name'],
//           game: what.game ? what.game : [],
//           market: [
//             'id',
//             'name',
//             'col_count',
//             'type',
//             'order',
//             'cashout',
//             'group_id',
//             'group_name',
//           ],
//           event: ['id', 'price', 'name', 'type', 'base', 'order'],
//         },
//         where,
//         subscribe: true,
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback: updatesCallback || responseCallback,
//     })
//   }

//   /**
//    * Request game details by id
//    * @param id string
//    * @param callback function
//    * @return function to remove from callbacks list
//    */
//   @action requestGetEventId = (id, responseCallback, updatesCallback) => {
//     const data = {
//       rid: `request_get_event_id_${id}`,
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['id', 'name'],
//           region: ['id', 'name'],
//           competition: ['id', 'name'],
//           game: ['id', 'team1_name', 'team2_name'],
//           market: ['id', 'name'],
//           event: ['id', 'price', 'name', 'type', 'base'],
//         },
//         where: {
//           event: { id },
//         },
//         subscribe: true,
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback: updatesCallback || responseCallback,
//     })
//   }

//   /**
//    * Request region details by id
//    * @param {string} id
//    * @param {function} responseCallback
//    * @param {function} updatesCallback
//    * @return {function} to remove from callbacks list
//    */
//   @action requestGetRegionId = (
//     id,
//     responseCallback,
//     updatesCallback,
//     where = {}
//   ) => {
//     where.region = where.region || {}
//     where.region.id = id

//     where.game = where.game || {}
//     where.game.is_blocked = 0

//     const data = {
//       rid: `request_get_region_id_${id}`,
//       params: {
//         source: 'betting',
//         what: {
//           region: ['id', 'name'],
//           competition: ['id', 'name', 'order'],
//           game: '@count',
//         },
//         where,
//         subscribe: Boolean(updatesCallback),
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback,
//     })
//   }

//   /**
//    * Request live games on that region
//    */
//   @action requestGetLiveRegionId = (id, responseCallback, updatesCallback) => {
//     const where = { game: { type: 1 } }

//     return this.requestGetRegionId(id, responseCallback, updatesCallback, where)
//   }

//   /**
//    * Request competitions details from id
//    * @param {function} responseCallback
//    * @param {function} updatesCallback
//    * @return {function} to remove from callbacks list
//    */
//   @action requestGetCompetitionId = (
//     id,
//     responseCallback,
//     updatesCallback,
//     where = {}
//   ) => {
//     where.competition = where.competition || {}
//     where.competition.id = id

//     where.game = where.game || {}
//     where.game.is_blocked = 0

//     const data = {
//       rid: `request_get_competition_id_${id}`,
//       params: {
//         source: 'betting',
//         what: {
//           competition: ['id', 'name'],
//           game: [
//             'id',
//             'team1_name',
//             'team2_name',
//             'type',
//             'start_ts',
//             'markets_count',
//             'info',
//             'match_length',
//             'text_info',
//           ],
//         },
//         where,
//         subscribe: Boolean(updatesCallback),
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback,
//     })
//   }

//   /**
//    * Request live competition details by id
//    */
//   @action requestGetLiveCompetitionId = (
//     id,
//     responseCallback,
//     updatesCallback
//   ) => {
//     const where = { game: { type: 1 } }

//     return this.requestGetCompetitionId(
//       id,
//       responseCallback,
//       updatesCallback,
//       where
//     )
//   }

//   /**
//    * @param id string
//    * @param callback function
//    * @description request competition details by id with some special fields
//    * @return function to remove from callbacks list
//    */
//   @action requestGetSpecialCompetitionId = (id, callback) => {
//     const data = {
//       rid: `request_get_special_competition_id_${id}`,
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['name'],
//           region: ['name'],
//           competition: ['id', 'name'],
//           game: [
//             'id',
//             'type',
//             'team1_name',
//             'team2_name',
//             'start_ts',
//             'markets_count',
//           ],
//           market: ['id', 'name', 'col_count', 'type', 'order', 'cashout'],
//           event: [],
//         },
//         where: {
//           competition: { id },
//         },
//         subscribe: false,
//       },
//     }

//     return this.sendWebsocketMessage('get', data, callback)
//   }

//   /**
//    * Request sport details by id
//    * @param {string} id
//    * @param {function} responseCallback
//    * @param {function} updatesCallback
//    * @return {function} to remove from callbacks list
//    */
//   @action requestGetSportId = (
//     id,
//     responseCallback,
//     updatesCallback,
//     where
//   ) => {
//     if (!where) {
//       where = {
//         sport: { id },
//         game: {
//           '@or': [
//             { type: { '@in': [0, 2] } },
//             { visible_in_prematch: 1, type: 1 },
//           ],
//         },
//       }
//     }

//     where.sport = where.sport || {}
//     where.sport.id = id

//     where.game = where.game || {}
//     where.game.is_blocked = 0

//     const data = {
//       rid: `request_get_sport_id_${id}`,
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['id', 'name'],
//           region: ['id', 'name', 'order'],
//         },
//         where,
//         subscribe: Boolean(updatesCallback),
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback,
//     })
//   }

//   /**
//    * Get the live sports data
//    */
//   @action requestGetLiveSportId = (id, responseCallback, updatesCallback) => {
//     const where = { game: { type: 1 } }

//     return this.requestGetSportId(id, responseCallback, updatesCallback, where)
//   }

//   /**
//    * @param id string
//    * @param responseCallback function
//    * @param updatesCallback function
//    * @description get odds changes by subscribing to an event id
//    * @return function to remove from callbacks list
//    */
//   @action requestGetOddsChangeEventId = (
//     id,
//     responseCallback,
//     updatesCallback
//   ) => {
//     const data = {
//       rid: `request_get_odds_change_event_id_${id}`,
//       params: {
//         source: 'betting',
//         what: { event: ['id', 'price'] },
//         where: { event: { id } },
//         subscribe: true,
//       },
//     }

//     return this.sendWebsocketMessage('get', data, {
//       responseCallback,
//       updatesCallback: updatesCallback || responseCallback,
//     })
//   }

//   /**
//    * @param pending boolean
//    * @param fromDate number
//    * @param toDate number
//    * @param callback function
//    * @description request bet history from bc websocket
//    * @return function to remove from callbacks list
//    */
//   @action requestBetHistory = (pending, fromDate, toDate, callback) => {
//     const from_date = Number(fromDate)
//     const to_date = Number(toDate)

//     const data = {
//       params: {
//         where: {
//           from_date,
//           to_date,
//         },
//       },
//     }

//     if (pending) data.params.where.outcome = 0

//     return this.sendWebsocketMessage('bet_history', data, async (request) => {
//       return this.parseMissingBcBets(request, {
//         pending,
//         from_date,
//         to_date,
//         callback,
//       })
//     })
//   }

//   /**
//    * Parse some bets that were missing on BC, injecting on the middle of the call
//    */
//   @action parseMissingBcBets = async (
//     request,
//     { pending, from_date, to_date, callback }
//   ) => {
//     if (request.data.bets) {
//       const playerId = this.SessionStore.player.details.id

//       // We had an issue on BC, they didnt created some bets, so we are injecting from firebase to the players
//       try {
//         const data = await this.TranslationStore.loadMissingBetConstructBet(
//           playerId
//         )

//         const parsedData = Object.entries(data)
//           .map(([key, value]) => {
//             const date_time = moment(value.date_time, 'DD/MM/YYYY HH:mm').unix()

//             const id = key.replace('id_', '')

//             const events = value.events.map((event) => {
//               return { id, ...event }
//             })

//             return {
//               ...value,
//               id,
//               date_time,
//               events,
//               missingBc: true,
//             }
//           })
//           .filter((data) => {
//             const matchTime =
//               data.date_time >= from_date && data.date_time <= to_date

//             return (
//               matchTime && (!pending || (pending && Number(data.outcome) === 0))
//             )
//           })

//         request.data.bets = [...request.data.bets, ...parsedData]
//       } catch (error) {
//         Tracker.sendMissingBcBets(playerId, error)
//       }
//     }

//     callback(request)
//   }

//   /**
//    * @param searchTerm string
//    * @param callback function
//    * @description search on bet construct using a string
//    * @return function to remove from callbacks list
//    */
//   @action requestSearchSport = (searchTerm, callback) => {
//     const language = this.TranslationStore.getSearchLanguage()

//     const data = {
//       rid: 'request_search_sports',
//       params: {
//         source: 'betting',
//         what: { sport: [], competition: [], region: [] },
//         where: {
//           sport: {
//             name: {
//               '@like': { [language]: searchTerm },
//             },
//           },
//         },
//       },
//     }

//     return this.sendWebsocketMessage('get', data, callback)
//   }

//   /**
//    * @param searchTerm string
//    * @param callback function
//    * @description search on bet construct using a string
//    * @return function to remove from callbacks list
//    */
//   @action requestSearchCompetition = (searchTerm, callback) => {
//     const language = this.TranslationStore.getSearchLanguage()

//     const data = {
//       rid: 'request_search_competition',
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['id', 'name', 'alias'],
//           region: ['id', 'name', 'order'],
//           competition: ['id', 'name', 'order'],
//           game: [
//             'id',
//             'team1_name',
//             'team2_name',
//             'type',
//             'start_ts',
//             'markets_count',
//           ],
//         },
//         where: {
//           competition: {
//             name: {
//               '@like': { [language]: searchTerm },
//             },
//           },
//         },
//       },
//     }

//     return this.sendWebsocketMessage('get', data, callback)
//   }

//   /**
//    * @param searchTerm string
//    * @param callback function
//    * @description search on bet construct using a string
//    * @return function to remove from callbacks list
//    */
//   @action requestSearchTeam = (searchTerm, callback) => {
//     const language = this.TranslationStore.getSearchLanguage()

//     const data = {
//       rid: 'request_search_team',
//       params: {
//         source: 'betting',
//         what: {
//           sport: ['id', 'name'],
//           region: ['id', 'name'],
//           competition: ['id', 'name'],
//           game: [
//             'type',
//             'start_ts',
//             'team1_name',
//             'team2_name',
//             'id',
//             'is_live',
//           ],
//         },
//         where: {
//           game: {
//             '@or': [
//               { team1_name: { '@like': { [language]: searchTerm } } },
//               { team2_name: { '@like': { [language]: searchTerm } } },
//             ],
//           },
//         },
//         subscribe: false,
//       },
//     }

//     return this.sendWebsocketMessage('get', data, callback)
//   }

//   /**
//    * @param events array
//    * @param callback function
//    * @description get max bet for one or more events
//    * @return function to remove from callbacks list
//    */
//   @action requestMaxBet = (events = [], callback) => {
//     if (!events.length) return null

//     const data = {
//       rid: `request_max_bet_${events.join('_')}`,
//       params: { events },
//     }

//     // Betconstruct changed their API, and here we put it back the way it was before
//     const parsedCallback = (result) => {
//       if (
//         result &&
//         result.data &&
//         result.data.details &&
//         typeof result.data.details.amount !== 'undefined'
//       ) {
//         result.data.result = result.data.details.amount
//       }

//       callback(result)
//     }

//     return this.sendWebsocketMessage('get_max_bet', data, parsedCallback)
//   }

//   /**
//    * @param bet_id number
//    * @param price number
//    * @param callback function
//    * @description Full cashout of a cashoutable bet.
//    */
//   @action requestCashout = (bet_id, price, callback) => {
//     const data = {
//       rid: `cashout_${bet_id}`,
//       params: {
//         bet_id,
//         price,
//       },
//     }

//     return this.sendWebsocketMessage('cashout', data, callback)
//   }

//   /**
//    * @description callback to execute after ws init and request session
//    */
//   @action sessionCallback = () => {
//     this.connectionStatus = true
//     this.requestConfigs()

//     if (this.initCallbacks) {
//       this.initCallbacks.forEach((callback) => callback())
//       this.initCallbacks = undefined
//     }
//   }

//   /**
//    * @param result object
//    * @description callback from bc to get our config
//    */
//   @action configsCallback = (result) => {
//     try {
//       this.configs =
//         result.data.data.partner[process.env.REACT_APP_BET_CONSTRUCT_SITE_ID]

//       if (this.SessionStore.player.isLogged && !this.isLogged) {
//         this.requestUserSession()

//         this.BettingSlipStore.removeAllFromBettingSlip()

//         this.remountIfConnectionChange = true

//         setTimeout(() => {
//           this.remountIfConnectionChange = false
//         }, 100)
//       }
//     } catch (error) {
//       GoogleAnalytics.sendError({
//         file: 'BetconstructStore',
//         method: 'configsCallback',
//         error,
//       })
//     }
//   }

//   /**
//    * @description Stops the call to bc to keep user alive
//    */
//   @action stopKeepAlive = () => {
//     clearInterval(this.getBalanceKeepAlive)
//     this.getBalanceKeepAlive = null
//   }

//   /**
//    * @description Keeps the BC user session alive
//    */
//   @action startKeepAlive = () => {
//     // TODO: we can use this function to update the user balance, dont need to call another interval
//     this.getBalanceKeepAlive = setInterval(() => {
//       if (this.SessionStore.player.isLogged && this.isLogged) {
//         this.sendWebsocketMessage('get_balance')
//       }
//     }, 28000)
//   }

//   /**
//    * @param result object
//    * @description Handle Betconstruct Websocket response called by onMessage function
//    */
//   @action handleOnMessage = (result) => {
//     const callback = this.websocketCallbacks.find(
//       (websocketCallback) => websocketCallback.rid === result.rid
//     )

//     Tracker.sendBcRequest('on_message', result)

//     if (!callback) return

//     if (result.data && callback.updatesCallback) {
//       this.websocketSubscriptions.push({
//         rid: callback.rid,
//         subid: result.data.subid,
//         updatesCallback: callback.updatesCallback,
//       })
//     }

//     if (callback.responseCallback) callback.responseCallback(result)

//     this.websocketCallbacks = this.websocketCallbacks.filter(
//       (websocketCallback) => websocketCallback.rid !== result.rid
//     )
//   }

//   /**
//    * @param result object
//    * @description Handle Betconstruct Websocket update called by onMessage function
//    */
//   @action handleOnUpdateMessage = (result) => {
//     if (result.data) {
//       Object.entries(result.data).forEach(([subid, change]) => {
//         const callback = this.websocketSubscriptions.find(
//           (subscription) => subscription.subid === subid
//         )

//         if (callback && callback.updatesCallback) {
//           callback.updatesCallback(change)
//         }
//       })
//     }
//   }

//   /**
//    * @param message object
//    * @description Websocket Lifecycle function triggered when we receive message
//    */
//   @action onMessage = (message) => {
//     const result = JSON.parse(message.data)

//     if (result.code === ERROR_CODES.NO_ERROR) {
//       if (result.rid === '0') {
//         this.handleOnUpdateMessage(result)
//       } else {
//         this.handleOnMessage(result)
//       }
//     } else {
//       this.websocketCallbacks = this.websocketCallbacks.filter(
//         (callback) => callback.rid !== result.rid
//       )

//       GoogleAnalytics.sendError({
//         file: 'BetconstructStore',
//         method: 'onMessage',
//         error: result,
//       })
//     }
//   }

//   /**
//    * Boost a bet on our backend, and after, calling betconstruct
//    */
//   @action boostBet = (data) =>
//     ApiService.playerPost({ url: URLS.BOOST_BET, data })

//   /**
//    * Get player boosted bets list to check if the player already placed one of those
//    */
//   @action loadPlayerBoostedBets = () =>
//     ApiService.playerPost({ url: URLS.PLAYER_BOOSTED_BETS })

//   /**
//    * Prepare Premade Bet on the backend
//    */
//   @action preparePremade = (data) =>
//     ApiService.playerPost({ url: URLS.PREPARE_PREMADE, data })
// }

// export default new BetconstructStore()

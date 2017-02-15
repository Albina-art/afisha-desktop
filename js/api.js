window.remote = "https://stark-cliffs-87419.herokuapp.com"

window.api = {
  regions: (callback) => {
    return $.ajax({
      url: window.remote + '/regions/index.json',
      success: callback,
      error: (error) => {
        console.error("Проблемы с интернетом? Ещё одна попытка через 30 секунд")
        setTimeout(() => api.regions(callback), 30000)
      }
    })
  },
  halls: function(region, callback) {
    return $.ajax({
      url: window.remote + '/halls/index.json?region=' + region,
      success: callback
    })
  },
  concerts: function(q, callback) {
    var url = window.remote + '/concerts/index.json?'
    url += Object.keys(q).filter(function(key) {
      return (["date_from", "date_to", "hall_ids"].indexOf(key) != -1)
    }).map(function(key) {
      return key + '=' + q[key]
    }).join('&')
    return $.ajax({
      url: url,
      success: callback
    })
  },
  login: {
    get: function (callback) {
      $.ajax({
        url: window.remote + '/users/sign_in',
        type: 'GET',
        success: callback
      })
    },
    post: function(data, callback) {
      document.querySelector(selector).querySelector
      $.ajax({
        url: window.remote + '/users/sign_in',
        type: 'POST',
        data: {
          user:{
            email: data.email,
            password: data.password,
            remember_me: 1
          },
          authenticity_token: data.token
        },
        success: function(data) {
          console.log("auth done")
        }
      })
    }
  },
  price: function(concert, cb_suc, cb_err){
    if (!concert.url.match(/mosconsv.ru/)) {
      return cb_err("bad_site")
    }
    $.ajax({
      url: concert.url,
      success: function(html){
        var doc = new DOMParser().parseFromString(html, 'text/html')
        var a = doc.querySelector('a[title="На этот концерт можно купить билет Online"]')
        if (!a) return cb_err("no_tickets")
      },
      error: cb_err
    })
  }
}

window.controller = window.controller || {}
controller.halls = (data) => {
  api.halls(data.region_id, function(halls){
    show(HAML.halls({halls: halls}))
    setAll = (t) => {
      [].forEach.call(document.getElementsByClassName('hall-check'), (e) => {
        e.checked = t
      })
    }
    help.setHandler('all-halls', 'click', () => setAll(true))
    help.setHandler('no-hall', 'click', () => setAll(false))
  })
}

window.controller = window.controller || {}
controller.halls = (data) => {
  api.halls(data.region_id, function(halls){
    show(HAML.halls({halls: halls}))
    let setAll = (t) => {
      [].forEach.call(document.getElementsByClassName('hall-check'), (e) => {
        e.checked = t
      })
    }
    help.setHandler('all-halls', 'click', () => setAll(true))
    help.setHandler('no-hall', 'click', () => setAll(false))
    help.setHandler(
      'submit',
      'click',
      () => controller.concerts({
        query: {
          hall_ids: [].filter.call(document.querySelectorAll('input[checked]'), (e)=>e.checked).map((e)=>e.name).join(',')
        },
        halls: halls
      })
    )
  })
}

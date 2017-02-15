window.controller = window.controller || {}
controller.regions = () => {
    api.regions(function(regions){
      show(HAML.regions({regions: regions}))
      help.setHandler('start', 'click', (event) => {
        event.target.setAttribute('disabled', true)
        select = document.getElementById('region')
        select.setAttribute('disabled', true)
        controller.halls({region_id: select.value})
      })
    })
}

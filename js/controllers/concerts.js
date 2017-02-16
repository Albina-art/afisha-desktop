window.controller = window.controller || {}
controller.concerts = (data) => {
  api.concerts(data.query, (concerts) => {
    let n = 0
    concerts.forEach( (c) => {
      c.hall = data.halls.find( (h) => c.hall_id == h.id )
    })
    let abler = () => {
      if (n == 0)
        document.getElementById('left').setAttribute('disabled',true)
      else 
        document.getElementById('left').removeAttribute('disabled')
      if (n == concerts.length - 1)
        document.getElementById('right').setAttribute('disabled',true)
      else 
        document.getElementById('right').removeAttribute('disabled')
    }
    show(HAML.concerts({concert: concerts[n]}))
    if (concerts.length > 0) {
      abler()
      help.setHandler('left', 'click', () => {
        if (n > 0){
          document.getElementById('concert-w').innerHTML = HAML.concert({concert: concerts[--n]})
          abler()
        }
      })
      help.setHandler('right', 'click', () => {
        if (n < concerts.length - 1) {
          document.getElementById('concert-w').innerHTML = HAML.concert({concert: concerts[++n]})
          abler()
        }
      })
    }
  })
}

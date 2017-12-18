const listaNomes = ['Oscar Martins', 'Melissa Martinez']
const listaTelemoveis = ['+351913859014', '+351912329091']
var listaNomesCache = []
var listaTelemoveisCache = []

function knowMobileByName (name) {
  for (var np = 0; np < listaNomes.length; np++) {
    if (name === listaNomes[np]) {
      return listaTelemoveis[np]
    }
  }
  return null
}

function knowNameByMobile (mobile) {
  for (var np = 0; np < listaTelemoveis.length; np++) {
    if (mobile === listaTelemoveis[np]) {
      return listaNomes[np]
    }
  }
  return null
}

function sorteio (lista, listaCache) {
  const next = Math.random()
  const nextChoice = Math.floor(((next * lista.length)))
  const value = lista[nextChoice || 0]
  if (listaCache.indexOf(value) > -1) {
    return sorteio(lista, listaCache)
  } else {
    listaCache.push(value)
  }
  return value
}

function mobileSort (name) {
  const mobile = knowMobileByName(name)
  var insort = true
  var _mobileSort = null
  while (insort) {
    _mobileSort = listaTelemoveis[Math.floor(((Math.random() * listaTelemoveis.length) || 0))]
    if (_mobileSort === mobile) {
      if (listaTelemoveisCache.indexOf(_mobileSort) <= -1 && listaTelemoveisCache.length === 4) {
        listaTelemoveisCache.push(_mobileSort)
        insort = false
        var tmpLst = listaTelemoveisCache.slice(0)
        listaTelemoveisCache[listaTelemoveisCache.length - 2] = tmpLst[tmpLst.length - 1]
        listaTelemoveisCache[listaTelemoveisCache.length - 1] = tmpLst[tmpLst.length - 2]
      }
      continue
    } else {
      if (listaTelemoveisCache.indexOf(_mobileSort) > -1) {
        if (listaTelemoveisCache.length === listaNomesCache.length) {
          insort = false
        }
        continue
      }
      listaTelemoveisCache.push(_mobileSort)
      insort = false
    }
  }
  return listaTelemoveisCache
}

function preSorteio () {
  listaNomesCache = []
  listaTelemoveisCache = []
  while (listaNomesCache.length < listaNomes.length) {
    sorteio(listaNomes, listaNomesCache)
  }
  for (var np = 0; np < listaNomesCache.length; np++) {
    mobileSort(listaNomesCache[np])
  }

  let msgsms
  const allmsg = []
  for (var ts = 0; ts < listaNomesCache.length; ts++) {
    msgsms = ('Ola {{name}}, o teu amigo(a) secreto(a) e {{mobileName}}. ').replace('{{name}}', listaNomesCache[ts]).replace('{{mobileName}}', knowNameByMobile(listaTelemoveisCache[ts]))
    msgsms += 'Valor max. presente de 5eur. '
    msgsms += 'O jantar e na Baia-do-Peixe na prox. 4feira as 20h00.'
    console.log(msgsms.length)
    allmsg.push({to: knowMobileByName(listaNomesCache[ts]), msg: msgsms})
  }
  return allmsg
}
module.exports = {
  username: '',
  password: '',
  credentials (username, password) {
    this.username = username
    this.password = password
  },
  adicionarListaContactos (objContacts) {
    console.log(objContacts)
  },
  adicionarListaNomes (objNomes) {
    console.log(objNomes)
  },
  adicionarListaMobile (objMobile) {
    console.log(objMobile)
  },
  sentBulkSms () {
    const resume = {
      status: 200,
      output: {}
    }
    try {
      const sorteioSemiFinal = []
      var counterDown = 20
      while (counterDown !== 0) {
        sorteioSemiFinal.push(preSorteio())
        counterDown--
      }
      const sorteioFinal = sorteioSemiFinal[Math.floor(((Math.random() * sorteioSemiFinal.length) || 0))]
      const BulkSMS = require('./BulkSMS')
      for (var tx = 0; tx < sorteioFinal.length; tx++) {
        const msgobj = sorteioFinal[tx]
        const sms = new BulkSMS(this.username, this.password)
        sms.send(msgobj.to, msgobj.msg, (err, result) => {
          if (err) {
            console.log(err)
            return false
          }
          console.log(result)
          return true
        })
      }
      resume.output = sorteioFinal
    } catch (error) {
      console.log(error)
      resume.status = 400
      resume.output = error
    }
    return resume
  }
}

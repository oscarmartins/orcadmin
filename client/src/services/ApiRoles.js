const parameters = (rc, ra, ri) => { return {REQ_CONTEX: rc, REQ_ACTION: ra, REQ_INPUTS: ri} }
module.exports = {
  register (payload) { return parameters(1000, 1010, payload) },
  login (payload) { return parameters(2000, 2010, payload) },
  logout (payload) { return parameters(2000, 2020, payload) }
}

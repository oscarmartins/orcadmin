function resultOutput (iook, success, error, data) {
  return {
    iook: iook,
    success: success,
    error: error,
    data: data || null
  }
}

const INSTANCE = {
  resultOutput: {
    resultOutputSuccess: (success) => { return resultOutput(true, success, null, null) },
    resultOutputError: (error) => { return resultOutput(false, null, error, null) },
    resultOutputDataOk: (data) => { return resultOutput(true, null, null, data) },
    resultOutputDataError: (data) => { return resultOutput(false, null, null, data) }
  }
}
module.exports = INSTANCE

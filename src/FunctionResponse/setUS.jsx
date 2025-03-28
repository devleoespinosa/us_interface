function GetTruth(parameters, label) {
    return parameters.selectedCheckpoints.filter((word)=> word === label).length > 0? true: false;
}


export  async function Login(params) {

    const requestBody = {
        email: params.email,
        password: params.password
    }

    try {
        const response = await fetch("https://us-back.onrender.com/login",{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        console.log(response)
        const data = await response.json()
        localStorage.setItem("idUser", data.idUser.toString())
        console.log(data)
        return data.idStory
    } catch (error) {
        console.log("Ocurrió un error: "+error)
    }
    
}




export  async function SetUsParameters(parameters, idStory ) {
    
    var idUser = localStorage.getItem("idUser")

    const requestBody = {
        idUser: idUser,
        idStory: idStory+1,
        isCorrect: parameters.isCorrect,
        wellFormed: GetTruth(parameters, "Well-formed"),
        atomic: GetTruth(parameters, "Atomic"),
        minimal: GetTruth(parameters, "Minimal"),
        conceptuallySound: GetTruth(parameters, "Conceptually sound"),
        problemOriented: GetTruth(parameters, "Problem-oriented"),
        unambiguos: GetTruth(parameters, "Unambiguos"),
        conflictFree: GetTruth(parameters, "Conflict-free"),
        fullSentence: GetTruth(parameters, "Full sentence"),
        estimable: GetTruth(parameters, "Estimable"),
        unique: GetTruth(parameters, "Unique"),
        uniform: GetTruth(parameters, "Uniform"),
        independent: GetTruth(parameters, "Independent"),
        complete: GetTruth(parameters, "Complete"),
        correctStory: parameters.userStory
    }

    try {
        const response = await fetch("https://us-back.onrender.com/submit-parameters", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })

        var data = await response.json()

        alert(data.message)

        window.location.reload()

    } catch (error) {
        console.log("Ocurrió un error: "+error)
    }
}
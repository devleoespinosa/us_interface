

export default async function GetUserStory(lastId) {
    try {
        const response = await fetch("https://us-back.onrender.com/user-story/"+(lastId+1), {
            method: 'GET'
        })

        const data = await response.json(); 

        return data.story;
    } catch (error) {
        console.log("Ocurrió un error: "+ error )
    }
}


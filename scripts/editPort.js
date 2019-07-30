function submitPort(){
    let port = document.getElementById("port").value 

    if(port < 0 || port > 65536){
        document.getElementById('port-alert').textContent = `Port must be between 0 and 65536`
        writeToTerminal(`Tried to run invalid port: ${port}`)
        return
    }
    if (port.match(/[a-z]/i)) {
        document.getElementById('port-alert').textContent = `Port must contain only numbers`
        writeToTerminal(`Tried to run invalid port: ${port}`)
        return
    }

    try {
        ipcRenderer.send("editPort", port) //send back to server side to make change
    } catch (error) {
        writeToTerminal(error)
    }

    document.getElementById('port-alert').textContent = `Port is currently ${port}`
    db.set('port', port).write()
}

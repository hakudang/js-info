function toggleMenu(selectedTask){
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add('show');
    document.addEventListener('click', e =>{
        if(e.target != selectedTask){
            menuDiv.classList.remove('show');
        }
    });
}
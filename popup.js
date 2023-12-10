document.addEventListener('DOMContentLoaded', function () {
    // Code inside this block will run after the DOM has fully loaded

    function addMessage() {
        const messageInput = document.getElementById('messageInput');
        const messageList = document.getElementById('messageList');

        if (messageInput.value.trim() === '') {
            alert('Please enter a message.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item messageItem';

        const deleteLink = document.createElement('span');
        deleteLink.className = 'deleteLink';
        deleteLink.textContent = 'Delete';
        deleteLink.onclick = function() {
            listItem.remove();
        };

        listItem.innerHTML = `<span>${messageInput.value}</span>`;
        listItem.appendChild(deleteLink);

        messageList.appendChild(listItem);
        messageInput.value = '';
    }

    const addButton = document.getElementById('addMessageBtn');
    if (addButton) {
        addButton.addEventListener('click', addMessage);
    } else {
        console.error('Button not found');
    }

    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                // Prevent the default form submission behavior
                event.preventDefault();
                addMessage();
            }
        });
    } else {
        console.error('Input not found');
    }
});

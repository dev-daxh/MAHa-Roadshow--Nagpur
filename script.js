function toggleDialog() {
    var dialog = document.getElementById('mainDialog');
    var floatingBtn = document.getElementById('floatingBtn');
    var icon = floatingBtn.querySelector('.icon');
    if (dialog.style.display === 'none' || dialog.style.display === '') {
        dialog.style.display = 'block';
        icon.src = 'https://img.icons8.com/ios-filled/50/000000/close-window.png'; // Close icon
    } else {
        dialog.style.display = 'none';
        icon.src = 'https://i.pinimg.com/474x/55/e0/76/55e07698bca8e4aa1761121600c818e0.jpg'; // AI Icon
    }
}

function closeDialogue(dialogueId) {
    var dialog = document.getElementById(dialogueId);
    dialog.style.display = 'none';
}
function showDialogue(dialogueId) {
    var dialog = document.getElementById(dialogueId);
    dialog.style.display = 'block';
    dialog.querySelector('.dialogue-content').scrollTop = dialog.querySelector('.dialogue-content').scrollHeight;
}

function saveNote() {
    var title = document.getElementById('noteTitle').value;
    var content = document.getElementById('noteContent').value;

    if (title && content) {
        var notes = JSON.parse(getCookie('notes') || '[]');
        notes.push({ title: title, content: content });
        setCookie('notes', JSON.stringify(notes), 365);
        alert('Note saved successfully!');
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
        showPreviousNotes();
    } else {
        alert('Please fill in both fields.');
    }
}

function showPreviousNotes() {
    var notes = JSON.parse(getCookie('notes') || '[]');
    var notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    if (notes.length === 0) {
        notesList.innerHTML = '<p>No previous notes found.</p>';
    } else {
        notes.forEach(function(note) {
            var noteDiv = document.createElement('div');
            noteDiv.classList.add('note-item');
            noteDiv.innerHTML = '<h3>' + note.title + '</h3><p>' + note.content + '</p>';
            notesList.appendChild(noteDiv);
        });
    }

    // Scroll to the bottom of the notes section
    notesList.scrollTop = notesList.scrollHeight;
}

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    var serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var dialogueId = button.getAttribute('data-dialogue');
            var dialog = document.getElementById(dialogueId);
            dialog.style.display = 'block';
        });
    });

    var closeButtons = document.querySelectorAll('.dialogue .close');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.parentElement.parentElement.style.display = 'none';
        });
    });

    showPreviousNotes();
});
function showNoteDialog(event) {
    // Check if the clicked element is a note-item
    var noteItem = event.target.closest('.note-item');
    if (noteItem) {
        var noteTitle = noteItem.querySelector('h3').textContent;
        var noteContent = noteItem.querySelector('p').textContent;

        // Populate the dialog with note title and full content
        var dialog = document.getElementById('noteDialog');
        var titleElement = dialog.querySelector('.note-title');
        var contentElement = dialog.querySelector('.note-content');

        titleElement.textContent = noteTitle;
        contentElement.textContent = noteContent;

        // Show the dialog
        dialog.style.display = 'block';
    }
}

function closeNoteDialog() {
    var dialog = document.getElementById('noteDialog');
    dialog.style.display = 'none';
}

// Saves options to chrome.storage
function saveOptions() { 
    var enableAlternates = document.getElementById('enableAlternates').checked;
    chrome.storage.sync.set(
        { enableAlternates: enableAlternates}, 
        () => {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restoreOptions() {
    chrome.storage.sync.get(
        {enableAlternates: false}, 
        items => {
            document.getElementById('enableAlternates').checked = items.enableAlternates
            console.log(items.enableAlternates)
        }
    );
  }

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save')
    .addEventListener('click', saveOptions);
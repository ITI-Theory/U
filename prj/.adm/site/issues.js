const selectedTags = new Set();
const issues = [...document.querySelectorAll('.issue')];
const filterHost = document.querySelector('#tag-filters');
const clearButton = document.querySelector('#clear-filters');
const tags = [...new Set(issues.flatMap((issue) => issue.dataset.tags.split(',').filter(Boolean)))].sort();

function applyFilters() {
  issues.forEach((issue) => {
    const issueTags = new Set(issue.dataset.tags.split(',').filter(Boolean));
    issue.hidden = ![...selectedTags].every((tag) => issueTags.has(tag));
  });
  clearButton.hidden = selectedTags.size === 0;
  document.querySelectorAll('.tag-filter').forEach((button) => {
    button.setAttribute('aria-pressed', selectedTags.has(button.dataset.tag));
  });
}

tags.forEach((tag) => {
  const button = document.createElement('button');
  button.className = 'tag-filter';
  button.type = 'button';
  button.dataset.tag = tag;
  button.textContent = tag;
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    selectedTags.has(tag) ? selectedTags.delete(tag) : selectedTags.add(tag);
    applyFilters();
  });
  filterHost.append(button);
});

clearButton.addEventListener('click', () => {
  selectedTags.clear();
  applyFilters();
});

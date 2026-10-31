(() => {
  const form = document.querySelector('#teregon-contact');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const body = [
      `Name: ${values.get('name')}`,
      `Email: ${values.get('email')}`,
      '',
      'Project summary:',
      values.get('project')
    ].join('\n');
    const subject = encodeURIComponent('Teregon project inquiry');
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:hello@teregonlabs.com?subject=${subject}&body=${encodedBody}`;
  });
})();

const Confirm = {
    open(options){
        options = Object.assign({},{
            title: '',
            message: '',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: function(){},
            onCancel: function(){},
        },options);
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titleBar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;
        const template = document.createElement('template');
        template.innerHTML = html;
        const confirm = template.content.querySelector('.confirm');
        const confirmClose = template.content.querySelector('.confirm__close');
        const confirmButtonOk = template.content.querySelector('.confirm__button--ok');
        const confirmButtonCancel = template.content.querySelector('.confirm__button--cancel');
        confirm.addEventListener('click',event => {
            if(event.target === confirm){
                options.onCancel();
                this._close(confirm);
            }
        });
        confirmButtonOk.addEventListener('click',() => {
            options.onOk();
            this._close(confirm);
        });
        [confirmButtonCancel,confirmClose].forEach(element => {
            element.addEventListener('click',() => {
                options.onCancel();
                this._close(confirm);
            });
        });
        document.body.appendChild(template.content);
    },
    _close(confirm){
        confirm.classList.add('confirm--close');
        confirm.addEventListener('animationend',() => {
            document.body.removeChild(confirm);
        });
    }
};
document.querySelector('#buttonChangeBackground').addEventListener('click',() => {
    Confirm.open({
        title: 'Background Change',
        message: 'Are you sure you wish the Background Color',
        onOk: () => document.body.style.backgroundColor = 'green',
    });
});
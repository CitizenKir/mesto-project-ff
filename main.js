(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-27",headers:{authorization:"b5346afd-b691-4cb1-b750-bf9b11d6179b","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){var r,o=n.target.closest(".places__item");(r=o.id,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){return o.remove()})).catch((function(e){console.error(e)}))},r=function(n){var r,o=n.target.closest(".places__item"),c=n.target,a=o.querySelector(".card__like-count"),i=Number(a.textContent);c.classList.contains("card__like-button_is-active")?(r=o.id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){a.textContent=i-1,n.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(o.id).then((function(e){a.textContent=i+1,n.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error(e)}))},o={close:a,overlayClickHandler:null,keyHandler:null},c=function(e,t,n,r){t.addEventListener("click",(function(){a(e)})),e.addEventListener("mousedown",n),document.addEventListener("keydown",r),o.overlayClickHandler=n,o.keyHandler=r,e.classList.add("popup_is-opened")},a=function(e){document.removeEventListener("keydown",o.keyHandler),e.removeEventListener("click",o.close),e.removeEventListener("mousedown",o.overlayClickHandler),e.classList.remove("popup_is-opened")},i=function(e){if(e.target.classList.contains("popup")){var t=document.querySelector(".popup_is-opened");a(t)}},u=function(e){if("Escape"===e.code){var t=document.querySelector(".popup_is-opened");a(t)}},l=function(e,t,n,r){e.classList.remove(t),n.classList.remove(r),n.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.disabled=!1,e.classList.remove(t)}(t,n):function(e,t){e.disabled=!0,e.classList.add(t)}(t,n)},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t.inactiveButtonClass),n.forEach((function(n){var r=e.querySelector(".".concat(n.id,"-error"));l(n,t.inputErrorClass,r,t.errorClass)}))},f=document.querySelector("#card-template").content,p=document.querySelector(".places__list"),m=document.querySelector(".profile__edit-button"),_=document.getElementById("profile_edit"),v=_.querySelector(".popup__close"),y=document.querySelector(".profile__add-button"),h=document.getElementById("profile_add"),S=h.querySelector(".popup__close"),b=document.getElementById("image_detail"),q=b.querySelector(".popup__close"),E=b.querySelector(".popup__image"),k=b.querySelector(".popup__caption"),C=document.forms.profileEdit,g=document.forms.newPlace,L=document.forms.avatarEdit,x=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),U=document.querySelector(".profile__image"),A=document.getElementById("avatar_edit"),H=A.querySelector(".popup__close"),w=C.name,P=C.description,T=null;Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t=e[0],n=e[1];T=t._id,n.map((function(e){return G(e,T)})),V(t)})).catch((function(e){console.error(e)}));var I,N,D,O,j,J,M,V=function(e){x.textContent=e.name,B.textContent=e.about,U.style.backgroundImage="url(".concat(e.avatar,")")},z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input_error-text_active"},F=function(e,t){t?e.textContent="Сохранение...":!1===t&&(e.textContent="Сохранить")},G=function(e,t){var o=function(e,t,n,r,o,c){var a,i,u=e.cloneNode(!0),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__image"),d=u.querySelector(".card__title"),f=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-count"),m=u.querySelector("li");return a=c,i=t.owner._id,a===i||function(e){e.remove()}(l),t.likes.some((function(e){return e._id===c}))&&f.classList.add("card__like-button_is-active"),s.src=t.link,s.alt=t.name,d.textContent=t.name,p.textContent=t.likes.length,m.id=t._id,f.addEventListener("click",r),l.addEventListener("click",n),s.addEventListener("click",o),u}(f,e,n,r,K,t);p.prepend(o)},K=function(e){E.src=e.target.currentSrc,E.alt=e.target.alt,k.textContent=e.target.alt,c(b,q,i,u)};m.addEventListener("click",(function(){w.value=x.textContent,P.value=B.textContent,c(_,v,i,u),d(_.querySelector(z.formSelector),z)})),y.addEventListener("click",(function(){c(h,S,i,u),d(h.querySelector(z.formSelector),z)})),U.addEventListener("click",(function(){c(A,H,i,u),d(A.querySelector(z.formSelector),z)})),C.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=_.querySelector(".popup__button");F(c,!0),(r=w.value,o=P.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){x.textContent=e.name,B.textContent=e.about,a(_)})).catch((function(e){console.error(e)})).finally((function(e){F(c,!1)}))})),g.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=g.placeName.value,i=g.link.value,u=h.querySelector(".popup__button");F(u,!0),(r=c,o=i,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:o})}).then((function(e){return t(e)}))).then((function(e){G(e,T),g.reset(),a(h)})).catch((function(e){console.error(e)})).finally((function(e){F(u,!1)}))})),L.addEventListener("submit",(function(n){n.preventDefault();var r,o=L.avatar.value,c=L.querySelector(".popup__button");F(c,!0),(r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){U.style.backgroundImage="url(".concat(e.avatar,")"),L.reset(),a(A)})).catch((function(e){console.error(e)})).finally((function(e){F(c,!1)}))})),N=(I=z).formSelector,D=I.inputSelector,O=I.submitButtonSelector,j=I.inactiveButtonClass,J=I.inputErrorClass,M=I.errorClass,Array.from(document.querySelectorAll(N)).forEach((function(e){!function(e,t,n,r,o,c){var a=e.querySelector(n),i=Array.from(e.querySelectorAll(t));s(i,a,r),i.forEach((function(t){t.addEventListener("input",(function(){var n=e.querySelector(".".concat(t.id,"-error"));!function(e,t,n,r,o){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?l(e,t,r,o):function(e,t,n,r,o){e.classList.add(t),n.classList.add(r),n.textContent=o}(e,t,r,o,e.validationMessage)}(t,o,0,n,c),s(i,a,r)}))}))}(e,D,O,j,J,M)}))})();
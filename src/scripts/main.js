'use strict';

// write your code here

const listUrl = `https://mate-academy.github.io/`
+ `phone-catalogue-static/api/phones.json`;
const list = document.createElement('ul');

document.body.append(list);

function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => response.json())
      .then(items => resolve(items))
      .catch(error => reject(new Error(error.message)));

  setTimeout(() => {
    reject(new Error('Request reached timeout'));
  }, 5000);
  });
}

function getPhonesDetails(phoneIds) {
  const phoneDetails = [];

  return new Promise((resolve, reject) => {
    for (const phoneId of phoneIds) {
      fetch(`https://mate-academy.github.io/`
      + `phone-catalogue-static/api/phones/${phoneId}.json`)
        .then(response => response.json())
        .then(details => phoneDetails.push(details))
        .catch(error => reject(new Error(error.message)));
    }

    resolve(phoneDetails);
  });
}

getPhones()
  .then(phones => {
    phones.map(phone => {
      const li = document.createElement('li');

      li.innerHTML = phone.name;
      list.append(li);
    });

    return phones.map(phone => phone.id);
  })
  .then(ids => getPhonesDetails(ids));
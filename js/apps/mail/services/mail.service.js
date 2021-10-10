import { utilService } from "../../../services/util.service.js"
import { storageService } from '../../../services/storage.service.js'
export const mailService = {
    query,
    getUserEmail,
    addEmail,
    getEmailById,
    deleteEmail,
    saveUpdatedEmail,
    getUnreadEmailsNum,
    checkForDraft
}

const KEY = 'emailsDB'
let gEmails

_createEmails()


function getUserEmail() {
    return loggedinUser.email
}

function getEmailById(id) {
    const x = gEmails.find(email => email.id === id)
    return x
}

function getUnreadEmailsNum() {
    let num = 0
    gEmails.forEach(email => {
        email.isRead ? '' : num++
    })
    return num
}

function checkForDraft(id) {
    return gEmails.find(email => email.id === id)

}

function saveUpdatedEmail(updatedEmail, criteria) {
    let emailIdx = gEmails.findIndex(email => email.id === updatedEmail.id)
    switch (criteria) {
        case 'read':
            gEmails[emailIdx].isRead = updatedEmail.isRead
            break;
        case 'star':
            gEmails[emailIdx].isStar = updatedEmail.isStar
            break;
        case 'trash':
            gEmails[emailIdx].isTrash = updatedEmail.isTrash
            break;
    }
    storageService.saveToStorage(KEY, gEmails)
}

function addEmail(email) {
    gEmails.push(email)
    storageService.saveToStorage(KEY, gEmails)
}

function deleteEmail(id) {
    const emailIdx = gEmails.findIndex(email => email.id === id)
    gEmails.splice(emailIdx, 1)
    storageService.saveToStorage(KEY, gEmails)
}

function query(filterBy) {
    let emails = storageService.loadFromStorage(KEY)
    if (!emails || emails.length < 1) {
        emails = gEmails
        storageService.saveToStorage(KEY, emails)
    }
    if (filterBy.folder) {
        let emailsToShow;
        switch (filterBy.folder) {
            case 'all':
                emailsToShow = emails.filter(email => email.isTrash === false && email.isDraft === false)
                break;
            case 'inbox':
                emailsToShow = emails.filter(email => email.from !== loggedinUser.email && email.isTrash === false && email.isDraft === false)
                break;
            case 'sent':
                emailsToShow = emails.filter(email => email.from === loggedinUser.email && email.isTrash === false && email.isDraft === false)
                break;
            case 'draft':
                emailsToShow = emails.filter(email => email.isDraft === true && email.isTrash === false)
                break;
            case 'trash':
                emailsToShow = emails.filter(email => email.isTrash === true && email.isDraft === false)
                break;
            case 'star':
                emailsToShow = emails.filter(email => email.isStar === true && email.isDraft === false)
                break;
        }
        return Promise.resolve(emailsToShow)
    }
    return Promise.resolve(emails)
}




const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function _createEmails() {
    let emails = storageService.loadFromStorage(KEY)
    if (!emails || emails.length < 1) {
        emails = [{
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: Date.now() - 10000000,
                to: 'momo@momo.com',
                from: 'user@appsus.com',
                isRead: true,
                isStar: false,
                isTrash: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'Result for your COVID 19 test',
                body: 'Dear Mahatma, your COVID19 results are negative! However, there is an important update on your HIV test... call my clinic as soon as you get this email.',
                isRead: false,
                sentAt: Date.now(),
                to: 'user@appsus.com',
                from: 'doctor_cohen_clinic@life.com',
                isRead: false,
                isStar: false,
                isTrash: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'I really Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: Date.now() - 458493859,
                to: 'user@appsus.com',
                from: 'gal_gadot@hollywood.com',
                isRead: false,
                isStar: false,
                isTrash: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'Dinner on the weekend',
                body: 'Hi! If we\'re still on for Friday I\'d like to make reservasions to "GDB", is that cool with you?',
                isRead: true,
                sentAt: Date.now() - 4859848954,
                to: 'hotty@hotty.com',
                from: 'user@appsus.com',
                isRead: true,
                isStar: false,
                isTrash: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'OnlyFans resubscription ',
                body: 'Hello Mahatma! We\'re happy to tell you that your payment cleared and we\'ve renewed your subscription for a whole year. have fun! ;)',
                isRead: false,
                sentAt: Date.now(),
                to: 'user@appsus.com',
                from: 'onlyfans@gov.co.il',
                isRead: false,
                isStar: false,
                isTrash: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'Golf game this weekend',
                body: 'Hi! If we\'re still on for Friday I\'d like to make reservasions to "Caesarea Golf Club", right by my house. Cool with you?',
                isRead: true,
                sentAt: Date.now() - 48495849,
                to: 'user@appsus.com',
                from: 'BenjaminNetanyaho@bibi.com',
                isRead: false,
                isStar: false,
                isTrash: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: '10 Ways to get rich before you\'re 30',
                body: 'Hello! Do you want to be rich without doing any work? do you want a passive 90k income a month?! call us now on 03-7757757 or subscribe to our Youtube channel "Dennis&Michelle Hartot" and we will teach you the tricks that no one but us knows!',
                isRead: true,
                sentAt: Date.now() - 485948594,
                to: 'user@appsus.com',
                from: 'Dennis&Michelle@pyramidscheme.com',
                isRead: false,
                isStar: false,
                isTrash: false,
                isDraft: false
            },
        ]
        gEmails = emails
        storageService.saveToStorage(KEY, gEmails)
    }
    gEmails = storageService.loadFromStorage(KEY)
}
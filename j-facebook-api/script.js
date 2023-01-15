"use strict"

const token = "EAAITS5wnJyoBAGzXUN4x22P1OmEWpmlztueZBQaEqT8tYS5iKh3rksC2zASMo9lfZClfZBF45ZB0p6qdxcRnKZCuUh4MhxYVGpONTpZCUO99jPRvw86WWCmRGzD8zpbt31ymxgTIwui4PULO4rQeHosMJLl90JtghOM3zKCbTa4NCI2S3LudO0UyfdsMXz87M8WNPZBuTPVlith5zkkRHwt"
const field = "me?fields=id,name,picture,posts{id,created_time,from,full_picture,message,source,updated_time,link}"

let target = `https://graph.facebook.com/v14.0/${field}&access_token=${token}`
let url = encodeURI(target)

$(document).ready(() => {
    const navbarImg = $('#navbar-img')
    const navbarId =  $('#navbar-id')
    const navbarName = $('#navbar-name')
    const main = $('main')

    function show(res) {
        navbarImg.attr('src', res['picture']['data']['url'])
        navbarImg.attr('width', res['picture']['data']['width'])
        navbarImg.attr('height', res['picture']['data']['height'])

        navbarId.html('ID : <span>'+res.id+'</span>')
        navbarName.html('Name : <span>'+res.name+'</span>')
        
        const posts = res['posts']['data']
        
        for (const post in posts) {
            main.append(`<section class="col-md-6 mx-auto mb-5 card p-0">
                            <div class="card-header bg-dark">
                                <h5 class="card-title text-center text-white p-3">${posts[post].id}</h5>
                            </div>
                
                            <div class="card-body">
                                <div class="card-group border p-3">
                                    <a href="${posts[post]['full_picture'] ?? ''}" target="_blank">
                                        <img src="${posts[post]['full_picture'] ?? ''}" alt="${posts[post]['full_picture'] ?? 'No Photo'}" class="card-img">
                                    </a>
                                </div>
                
                                <div class="card-text card-group border p-3">
                                    Message :
                                    <p>
                                        <q>${posts[post].message ?? ''}</q>
                                    </p>
                                </div>
                
                                <div class="card-group border p-3">
                                    <div class="col-md-6">
                                        From : <span>${posts[post].from.name}</span>
                                    </div>
                                    <div class="col-md-6">
                                        ID : <span>${posts[post].from.id}</span>
                                    </div>
                                </div>
                            </div>
                
                            <div class="card-footer text-center">
                                <span class="text-muted">${posts[post]['updated_time']}</span>
                            </div>
                        </section>`)
        }

        // remove the preloader and alert box after posts is loaded
        $('#alert').hide()
        $('#preloader').hide()
    }

    function error(res) {
        // remove the preloader to show error message
        $('#preloader').hide()
        $('#alert').html(`<h5>Failed to load your posts. Status code : ${res.status}, Status Message : ${res.statusText}</h5>`).show()
    }

    // make ajax request for API

    $.ajax({
        url: url,
        method: 'GET',
        cache: true,
    }).done((res) => {
        show(res)
    }).fail((res) => {
        error(res)
    })
})

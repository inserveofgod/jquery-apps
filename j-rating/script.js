$(document).ready(() => {
    const stars = [$('#s1'), $('#s2'), $('#s3'), $('#s4'), $('#s5')]
    const starsLength = stars.length

    for (let i = 0; i < starsLength; i++) {
        stars[i].click(() => {
            for (let j = 0; j <= i; j++) {
                stars[j].removeClass('text-white').addClass('text-warning')
            }

            for (let k = i + 1; k < starsLength; k++) {
                stars[k].removeClass('text-warning').addClass('text-white')
            }
        })
    }
})

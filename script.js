function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()
Shery.makeMagnet(".magnet-target");
document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
        x: dets.x,
        y: dets.y
    })
})

document.querySelector(".magnet-target").addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
        scale: 2.5
    })
})
document.querySelector(".magnet-target").addEventListener("mouseleave", function (dets) {
    gsap.to("#cursor", {
        scale: 1
    })
})
document.querySelector("#text").addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
        scale: 13
    })
})
document.querySelector("#text").addEventListener("mouseleave", function (dets) {
    gsap.to("#cursor", {
        scale: 1
    })
})

function sound() {
    var sound = document.querySelector("#sound h2")
    var spann = document.querySelector("#sound h2 span")
    var aud = new Audio("https://heycusp.com/assets/main-theme.6603262e.mp3")
    var click = true
    sound.addEventListener("click", function () {
        if (click == true) {
            aud.play()
            spann.textContent = "off"
            click = false
        }
        else {
            aud.pause()
            spann.textContent = "on"
            click = true
        }
    })
}
sound()

function menu() {
    var menu = document.querySelector("#menu")
    var flag = false
    menu.addEventListener("click", function () {
        console.log("object")
        if (flag == true) {
            gsap.to("#main", {
                backgroundColor: "white"
            })
            gsap.to("#navigation", {
                x: "0%"
            })
            flag = false
        }
        else {
            gsap.to("#main", {
                backgroundColor: "rgba(40, 38, 38, 0.212)"
            })
            gsap.to("#navigation", {
                x: "-40vw"
            })
            flag = true
        }
    })
}
menu()

function pageTwo() {
    var effect = document.querySelectorAll(".effect")
    effect.forEach(function (h) {
        var clutter = ""
        h.textContent.split(" ").forEach(function (word) {
            clutter += ` <span>${word}</span>`
        })
        h.innerHTML = clutter
    })
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 50%",
            end: "top -30%",
            scrub: 1
        }
    })
    tl
        .to("#arrow", {
            rotate: 90
        })
        .to(".effect1 span", {
            color: "black",
            stagger: 0.2
        })
        .to(".effect2 span", {
            color: "black",
            stagger: 0.2
        })
}
pageTwo()


function skill() {
    var txt = document.querySelectorAll(".txt")
    txt.forEach(function (hh) {
        var clutter2 = ""
        hh.textContent.split("").forEach(function (letter) {
            clutter2 += `<span>${letter}</span>`
        })
        hh.innerHTML = clutter2

        hh.addEventListener("mousemove", function () {
            gsap.to("#main", {
                backgroundColor: "#0000007e"
            })
        })
        hh.addEventListener("mouseleave", function () {
            gsap.to("#main", {
                backgroundColor: "white"
            })
        })
    })
}
skill()


function workCursor() {
    var cur = document.querySelector("#cursor h4")
    document.querySelectorAll(".view").forEach(function (v) {
        v.addEventListener("mousemove", function (dets) {
            gsap.to("#cursor", {
                scale: 4
            })
            cur.textContent = "view more"
        })
    })
    document.querySelectorAll(".view").forEach(function (v) {
        v.addEventListener("mouseleave", function (dets) {
            gsap.to("#cursor", {
                scale: 1
            })
            cur.textContent = ""

        })
    })
}
workCursor()

gsap.from("#say h1 span",{
    y:"100%",
    stagger:0.1,
    scrollTrigger:{
        trigger:"#footer",
        scroller:"#main",
        start:"top 30%",
        end:"top 10%",
        scrub:1,
        
    }
})
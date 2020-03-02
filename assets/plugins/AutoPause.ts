import MediaPlayer from '../MediaPlayer';

class AutoPause {

    private threshold: number
    player: MediaPlayer

    constructor() {
        this.threshold = 0.25
        this.handlerIntersection = this.handlerIntersection.bind(this)
        this.handlerVisibilityChange = this.handlerVisibilityChange.bind(this)
    }

    run(player) {
        this.player = player
        const observer = new IntersectionObserver(this.handlerIntersection, {
            threshold: this.threshold
        })

        observer.observe(player.media)

        document.addEventListener("visibilitychange", this.handlerVisibilityChange)
    }

    toggleVisible(isVisible) {
        if(isVisible){
            this.player.play()
        } else {
            this.player.pause()
        }
    }

    private handlerIntersection(entries: IntersectionObserverEntry[]) {
        const entry = entries[0]
        
        const isVisible = entry.intersectionRatio >= this.threshold
        this.toggleVisible(isVisible)        
    }

    private handlerVisibilityChange() {
        const isVisible = document.visibilityState === "visible"
        this.toggleVisible(isVisible)
    }
}

export default AutoPause
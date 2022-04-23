<script>
    import * as Tone from 'tone';

    const NOTES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    export let tuning = ["E2", "A2", "D3", "G3", "B3", "E4"];
    export let chamber_tone = 440;

    let currently_playing = ' ';

    function playNote(tune) {
        const synth = new Tone.Synth().toDestination();
        const now = Tone.now()
        currently_playing = getFrequenz(tune).toFixed(2) + ' Hz';
        synth.triggerAttackRelease(getFrequenz(tune), 1.8, now)
        setTimeout(() => {
            currently_playing = ' ';
        }, 2000)
    }

    function getFrequenz(note) {
        const max_octaves = 5;
        const octave = Math.pow(2, max_octaves - (parseInt(note.slice(-1)) + 1));
        const offset_half_tone = Math.pow(2, 1 / NOTES.length);
        let halfTonesFromA = getHalfTonesFromA(note);
        return chamber_tone / (octave * Math.pow(offset_half_tone, halfTonesFromA));
    }

    function getHalfTonesFromA(note) {
        const A = 9;
        let indexNote = NOTES.indexOf(note.substring(0, note.length - 1));
        if (indexNote === -1) {
            indexNote = NOTES_SHARP.indexOf(note.substring(0, note.length - 1));
        }
        return (A - indexNote);
    }

</script>

<div class="guitar-tuning-body">
    {#each tuning as tune}
        <div on:click={()=>{playNote(tune)}} class="note">{tune}</div>
    {/each}
</div>
<div class="guitar-tuning-body">
    <div class="playing">{currently_playing}</div>
</div>

<style>
    .playing {
        font-size: larger;
        height: 2em;
    }

    .guitar-tuning-body {
        font-family: Calibri, Candara, Arial, Helvetica, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .note {
        margin: 0.5em;
        padding: 0.5em;
        font-size: x-large;
        cursor: pointer;
    }
</style>
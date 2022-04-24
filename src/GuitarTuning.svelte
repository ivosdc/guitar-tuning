<script>
    import {fly} from 'svelte/transition';
    import * as Tone from 'tone';
    import {chevron_up, chevron_down} from './IconService';

    const NOTES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    export let tuning = ["E2", "A2", "D3", "G3", "B3", "E4"];
    $: tuning = typeof tuning === 'string' ? JSON.parse(tuning) : tuning;
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

    function setTuneUp(event, index) {
        invertY = 1;
        isOnChange = index;
        let note = tuning[index].substring(0, tuning[index].length - 1);
        let octave = parseInt(tuning[index].slice(-1));
        let note_index = NOTES.indexOf(note) === -1 ? NOTES_SHARP.indexOf(note) : NOTES.indexOf(note);
        note_index += 1;
        if (note_index > 11) {
            note_index = 0;
            octave += 1;
            if (octave > 5) {
                note_index = 11;
                octave = 5;
            }
        }
        let val = NOTES_SHARP[note_index];
        tuning[index] = val + octave;
        setTimeout(() => {
            isOnChange = -1;
        }, 300);
    }

    function setTuneDown(event, index) {
        invertY = -1;
        isOnChange = index;
        let note = tuning[index].substring(0, tuning[index].length - 1);
        let octave = parseInt(tuning[index].slice(-1));
        let note_index = NOTES.indexOf(note) === -1 ? NOTES_SHARP.indexOf(note) : NOTES.indexOf(note);
        note_index -= 1;
        if (note_index < 0) {
            note_index = 11;
            octave -= 1;
            if (octave < 0) {
                note_index = 0;
                octave = 0;
            }
        }
        let val = NOTES_SHARP[note_index];
        tuning[index] = val + octave;
        setTimeout(() => {
            isOnChange = -1;
        }, 300);
    }

    let isOnChange = -1;
    let invertY = -1; // 1 || -1
</script>

<div class="guitar-tuning-body">
    {#each tuning as tune, index}
        <div class="note-octave">
            <div class="note-up-down" on:click={(event)=>{setTuneUp(event, index)}}>{@html chevron_up}</div>
            <div class="note">
                {#if index !== isOnChange}
                        <div id={'note-' + index} on:click={()=>{playNote(tune)}} class="note"
                             in:fly="{{ y: -24 * invertY , duration: 300 }}"
                             out:fly="{{ y: 24 * invertY, duration: 300 }}">{tune}</div>
                {/if}
            </div>
            <div class="note-up-down" on:click={(event)=>{setTuneDown(event, index)}}>{@html chevron_down}</div>
        </div>
    {/each}
</div>
<div class="guitar-tuning-body">
    <div class="playing">{currently_playing}</div>
</div>

<style>

    .note-up-down {
        display: flex;
        justify-content: center;
        height: 24px;
        cursor: pointer;
    }

    .note-octave {
        display: grid;
        grid-template-rows: auto auto auto;
    }

    .playing {
        font-size: larger;
        height: 2em;
    }

    .guitar-tuning-body {
        font-family: Calibri, Candara, Arial, Helvetica, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3em;
    }

    .note {
        justify-content: center;
        text-align: center;
        min-width: 2em;
        height: 1.2em;
        font-size: x-large;
        cursor: pointer;
        background-color: #6e6e6e;
        color: #1A1A1A;
        overflow: hidden;
    }
</style>
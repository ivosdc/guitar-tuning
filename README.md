
# Guitar-tuning
- Web-component: `<guitar-tuning></guitar-tuning>`

Calculates the frequenz and plays the tones of a guitar-tuning set based on the chamber note.

All tunings are possible. 

[Try out live example](https://ivosdc.github.io/guitar-tuning/dist "Guitar tuner Example")

Default: 440 Hz, ["E2", "A2", "D3", "G3", "B3", "E4"]
#### ...made with Svelte



## Parameter
- tuning; default = ["E2", "A2", "D3", "G3", "B3", "E4"];
- chamber_tone; default = 440;

Tunings containing notes with `#` or `b` can be used as well. E.g. `["D2", "G2", "C3", "F#3", "A3", "D4"]`

## Examples
Svelte Example:
```js
<script>
  import GuitarTuning from 'guitar-tuning/src/GuitarTuning.svelte';
    
    let chamber_tone = 440;
    let tuning = ["E2", "A2", "D3", "G3", "B3", "E4"];
</script>
<GuitarTuning {chamber_tone} {tuning} />
```

Webcomponent Example:
```html
<head>
...
    <script defer src='https://ivosdc.github.io/guitar-tuning/dist/build/guitar-tuning.js'></script>
</head>
<body>
...
<guitar-tuning></guitar-tuning>
...
```

Webcomponent Example with parameter:
```html
<body>
<div class="my-player">
    <div>
        <span id="pitch-down" class="pitch-tune"><</span>
        <span id="chamber_pitch" class="pitch-tune"></span>
        <span id="pitch-up" class="pitch-tune">></span>
    </div>
    <guitar-tuning id="guitar-tuning"></guitar-tuning>
</div>
</body>

<script>
    let pitch = 440;
    let guitarTuning = document.getElementById('guitar-tuning');
    guitarTuning.setAttribute('shadowed', 'true');

    let pitchUp = document.getElementById('pitch-up');
    pitchUp.onclick = setPitchUp;
    let pitchDown = document.getElementById('pitch-down');
    pitchDown.onclick = setPitchDown;
    let chamber_pitch = document.getElementById('chamber_pitch');
    chamber_pitch.innerHTML = pitch.toString() + " Hz";

    function setPitchUp() {
        pitch++;
        guitarTuning.setAttribute('chamber_tone', pitch.toString());
        chamber_pitch.innerHTML = pitch.toString() + " Hz";
    }

    function setPitchDown() {
        pitch--;
        guitarTuning.setAttribute('chamber_tone', pitch.toString());
        chamber_pitch.innerHTML = pitch.toString() + " Hz";
    }
</script>
</html>

<style>
    .pitch-tune {
        font-family: Calibri, Candara, Arial, Helvetica, sans-serif;
        font-size: larger;
    }

    body {
        background-color: #1A1A1A;
        color: #6e6e6e;
    }

    .my-player {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-weight: lighter;
        font-size: x-small;
    }

    .link-me {
        color: #6e6e6e;
        font-size: x-small;
    }
</style>
```

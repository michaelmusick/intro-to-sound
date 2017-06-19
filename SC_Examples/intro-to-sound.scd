
s.scope;
s.freqscope;
s.plotTree;

(
/* Human Hearing Listening Test */

{
	arg length = 30;
	var freq, env, sig;

	freq = XLine.kr(15, 20000, dur: length).poll(label: \freq);

	env = Env.asr(0.1, 1, 0.1);
	env = EnvGen.kr(env, gate: Trig1.kr(1, dur: length).poll, doneAction: 2);

	sig = SinOsc.ar(freq, mul: env);
	sig = sig ! 2;


}.play;
)



// Building Complex Waves
(
{

	var sig;
	sig = SinOsc.ar( freq: 300.1 , mul: 1 );
	(sig ! 2) * 0.25
}.play;
)


(
// Square Wave | Initialize
~num = 10;
~basefreq = 100;
~harm = 1;

~num.do({

	{
		var sig;
		sig = SinOsc.ar(~basefreq * ~harm , mul: 1 / ~harm );
		(sig ! 2) * 0.5
	}.play;

	~harm = ~harm + 2;

})

)


s.scope;
s.freqscope;

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


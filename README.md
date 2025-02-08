# basic-ray-tracer
This is a JavaScript version of the ray tracer explained in the book ["Ray Tracing in One Weekend"](https://raytracing.github.io/).What i have done is that i sped up the computation speed by using webworkers to do the ray tracing computation in parallel in differnt threads hence reducing the time required for rendering.You can see the result below.
![Image being Rendered](RenderResult.gif)

The ray tracing computation for the overall image is divided into block of sub areas and given to a different web workers to work on.

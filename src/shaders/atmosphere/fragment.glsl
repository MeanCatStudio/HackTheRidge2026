uniform vec3 uLightPosition;
uniform vec3 uDayColor;
uniform vec3 uNightColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vPosition - cameraPosition);
    vec3 color = vec3(0.0);

    float fresnel = dot(viewDir, normal);
    fresnel = pow(fresnel, 2.0);
    float light = dot(normal, normalize(uLightPosition));

    float atmosphereColorMix = smoothstep(-1.0, 0.5, light);
    vec3 atmosphereColor = mix(uNightColor, uDayColor, atmosphereColorMix);
    color += atmosphereColor;

    //vec3 cameraRight = normalize(viewMatrix[0].xyz);
    //vec3 reflection = normalize(reflect(-uLightPosition, cameraRight));
    //float specular = max(-dot(viewDir, reflection), 0.0);
    //specular = pow(specular, 40.0);
    //color *= (specular * 10.0 + 1.0);

    float edgeAlpha = dot(viewDir, normal);
    edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);
    float lightAlpha = 1.0; //smoothstep(-1.0, 0.0, light);

    gl_FragColor = vec4(color, edgeAlpha * lightAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
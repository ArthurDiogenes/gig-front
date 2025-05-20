import React from 'react';

type IconProps = {
	color?: string;
	style?: React.CSSProperties;
};

export const BandProfileIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 32 32"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="currentColor"
				d="M21.053 20.8c-1.132-.453-1.584-1.698-1.584-1.698s-.51.282-.51-.51s.51.51 1.02-2.548c0 0 1.413-.397 1.13-3.68h-.34s.85-3.51 0-4.7c-.85-1.188-1.188-1.98-3.057-2.547s-1.188-.454-2.547-.396s-2.492.793-2.492 1.19c0 0-.85.056-1.188.396c-.34.34-.906 1.924-.906 2.32s.283 3.06.566 3.625l-.337.114c-.284 3.283 1.13 3.68 1.13 3.68c.51 3.058 1.02 1.756 1.02 2.548s-.51.51-.51.51s-.452 1.245-1.584 1.698s-7.416 2.886-7.927 3.396c-.512.51-.454 2.888-.454 2.888H29.43s.06-2.377-.452-2.888c-.51-.51-6.795-2.944-7.927-3.396zm-12.47-.172c-.1-.18-.148-.31-.148-.31s-.432.24-.432-.432s.432.432.864-2.16c0 0 1.2-.335.96-3.118h-.29s.144-.59.238-1.334a10 10 0 0 1 .037-.996l.038-.426c-.02-.492-.107-.94-.312-1.226c-.72-1.007-1.008-1.68-2.59-2.16c-1.584-.48-1.01-.384-2.16-.335c-1.152.05-2.112.672-2.112 1.01c0 0-.72.047-1.008.335c-.27.27-.705 1.462-.757 1.885v.28c.048.654.26 2.45.47 2.873l-.286.096c-.24 2.782.96 3.118.96 3.118c.43 2.59.863 1.488.863 2.16s-.432.43-.432.43s-.383 1.058-1.343 1.44l-.232.092v5.234h.575c-.03-1.278.077-2.927.746-3.594c.357-.355 1.524-.94 6.353-2.862zm22.33-9.056c-.04-.378-.127-.715-.292-.946c-.718-1.008-1.007-1.68-2.59-2.16s-1.007-.384-2.16-.335c-1.15.05-2.11.672-2.11 1.01c0 0-.72.047-1.008.335c-.27.272-.71 1.472-.758 1.89h.033l.08.914c.02.23.022.435.027.644c.09.666.21 1.35.33 1.59l-.286.095c-.24 2.782.96 3.118.96 3.118c.432 2.59.863 1.488.863 2.16s-.43.43-.43.43s-.054.143-.164.34c4.77 1.9 5.927 2.48 6.28 2.833c.67.668.774 2.316.745 3.595h.48V21.78l-.05-.022c-.96-.383-1.344-1.44-1.344-1.44s-.433.24-.433-.43s.433.43.864-2.16c0 0 .804-.23.963-1.84V14.66q0-.026-.003-.05h-.29s.216-.89.293-1.862z"
			></path>
		</svg>
	)
);
BandProfileIcon.displayName = 'BandProfileIcon';

export const UserIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="currentColor"
				d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8m2 10a3 3 0 0 0-3 3a1 1 0 1 1-2 0a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5a1 1 0 1 1-2 0a3 3 0 0 0-3-3z"
			></path>
		</svg>
	)
);
UserIcon.displayName = 'UserIcon';

export const LocationIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="currentColor"
				d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4m0-6c1.103 0 2 .897 2 2s-.897 2-2 2s-2-.897-2-2s.897-2 2-2"
			></path>
			<path
				fill="currentColor"
				d="M11.42 21.814a1 1 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819M12 4c3.309 0 6 2.691 6 6.005c.021 4.438-4.388 8.423-6 9.73c-1.611-1.308-6.021-5.294-6-9.735c0-3.309 2.691-6 6-6"
			></path>
		</svg>
	)
);
LocationIcon.displayName = 'LocationIcon';

export const MusicIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 16 16"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="none"
				stroke="currentColor"
				d="M5.5 11.992V3.51l8-1.01v7.852m-7.903-4.5l8.129-1.16M5.5 11.997a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm8-1.549a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"
				strokeWidth={1}
			></path>
		</svg>
	)
);
MusicIcon.displayName = 'MusicIcon';

export const TwitterIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={23.54}
			height={24}
			viewBox="0 0 251 256"
			style={style}
			{...props}
			ref={ref}
		>
			<path d="M149.079 108.399L242.33 0h-22.098l-80.97 94.12L74.59 0H0l97.796 142.328L0 256h22.1l85.507-99.395L175.905 256h74.59L149.073 108.399zM118.81 143.58l-9.909-14.172l-78.84-112.773h33.943l63.625 91.011l9.909 14.173l82.705 118.3H186.3l-67.49-96.533z"></path>
		</svg>
	)
);
TwitterIcon.displayName = 'TwitterIcon';

export const FacebookIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 256 256"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="#1877f2"
				d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
			></path>
			<path
				fill="#fff"
				d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
			></path>
		</svg>
	)
);
FacebookIcon.displayName = 'FacebookIcon';

export const InstagramIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 256 256"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="#0a0a08"
				d="M128 23.064c34.177 0 38.225.13 51.722.745c12.48.57 19.258 2.655 23.769 4.408c5.974 2.322 10.238 5.096 14.717 9.575s7.253 8.743 9.575 14.717c1.753 4.511 3.838 11.289 4.408 23.768c.615 13.498.745 17.546.745 51.723s-.13 38.226-.745 51.723c-.57 12.48-2.655 19.257-4.408 23.768c-2.322 5.974-5.096 10.239-9.575 14.718s-8.743 7.253-14.717 9.574c-4.511 1.753-11.289 3.839-23.769 4.408c-13.495.616-17.543.746-51.722.746s-38.228-.13-51.723-.746c-12.48-.57-19.257-2.655-23.768-4.408c-5.974-2.321-10.239-5.095-14.718-9.574c-4.479-4.48-7.253-8.744-9.574-14.718c-1.753-4.51-3.839-11.288-4.408-23.768c-.616-13.497-.746-17.545-.746-51.723s.13-38.225.746-51.722c.57-12.48 2.655-19.258 4.408-23.769c2.321-5.974 5.095-10.238 9.574-14.717c4.48-4.48 8.744-7.253 14.718-9.575c4.51-1.753 11.288-3.838 23.768-4.408c13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95c-8.418 3.271-15.556 7.648-22.672 14.764S9.991 35.738 6.72 44.155C3.555 52.297 1.392 61.602.77 75.226C.147 88.878 0 93.237 0 128s.147 39.122.77 52.774c.622 13.625 2.785 22.93 5.95 31.071c3.27 8.417 7.647 15.556 14.763 22.672s14.254 11.492 22.672 14.763c8.142 3.165 17.446 5.328 31.07 5.95c13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95c8.418-3.27 15.556-7.647 22.672-14.763s11.493-14.254 14.764-22.672c3.164-8.142 5.328-17.446 5.95-31.07c.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07c-3.271-8.418-7.648-15.556-14.764-22.672S220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0m0 62.27c-36.302 0-65.73 29.43-65.73 65.73s29.428 65.73 65.73 65.73c36.301 0 65.73-29.428 65.73-65.73c0-36.301-29.429-65.73-65.73-65.73m0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667m83.686-110.994c0 8.484-6.876 15.36-15.36 15.36s-15.36-6.876-15.36-15.36s6.877-15.36 15.36-15.36s15.36 6.877 15.36 15.36"
			></path>
		</svg>
	)
);
InstagramIcon.displayName = 'InstagramIcon';

export const StarIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="currentColor"
				d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"
			></path>
		</svg>
	)
);
StarIcon.displayName = 'StarIcon';

export const StarOutlineIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="currentColor"
				d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm3.15.45l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15zm0-5.025"
			></path>
		</svg>
	)
);
StarOutlineIcon.displayName = 'StarOutlineIcon';

export const EditIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="currentColor"
				d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
			></path>
		</svg>
	)
);

EditIcon.displayName = 'EditIcon';

export const ArrowLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<path
				fill="currentColor"
				d="M10.928 21a2.98 2.98 0 0 1-2.121-.879L1.686 13l7.121-7.121c1.133-1.134 3.109-1.134 4.242 0c.566.564.879 1.317.879 2.119c0 .746-.27 1.451-.764 2.002H18c1.654 0 3 1.346 3 3s-1.346 3-3 3h-4.836c.493.549.764 1.252.764 1.998a2.98 2.98 0 0 1-.879 2.124a2.98 2.98 0 0 1-2.121.878m-6.414-8l5.707 5.707a1.023 1.023 0 0 0 1.414 0c.189-.189.293-.441.293-.708s-.104-.517-.291-.705L8.342 14H18a1.001 1.001 0 0 0 0-2H8.342l3.293-3.293a.996.996 0 0 0 .001-1.413a1.023 1.023 0 0 0-1.415-.001z"
			></path>
		</svg>
	)
);
ArrowLeftIcon.displayName = 'ArrowLeftIcon';

export const TagIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
				<circle cx={7.5} cy={7.5} r={0.5} fill="currentColor"></circle>
			</g>
		</svg>
	)
);
TagIcon.displayName = 'TagIcon';

export const LoadingIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ style, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			style={style}
			{...props}
			ref={ref}
		>
			<g stroke="currentColor" strokeWidth={1}>
				<circle
					cx={12}
					cy={12}
					r={9.5}
					fill="none"
					strokeLinecap="round"
					strokeWidth={3}
				>
					<animate
						attributeName="stroke-dasharray"
						calcMode="spline"
						dur="1.5s"
						keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
						keyTimes="0;0.475;0.95;1"
						repeatCount="indefinite"
						values="0 150;42 150;42 150;42 150"
					></animate>
					<animate
						attributeName="stroke-dashoffset"
						calcMode="spline"
						dur="1.5s"
						keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
						keyTimes="0;0.475;0.95;1"
						repeatCount="indefinite"
						values="0;-16;-59;-59"
					></animate>
				</circle>
				<animateTransform
					attributeName="transform"
					dur="2s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				></animateTransform>
			</g>
		</svg>
	)
);
LoadingIcon.displayName = 'LoadingIcon';

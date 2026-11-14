import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type HomepageDocumentDataSlicesSlice = HeroSlice | ServicesSlice | RibbonSlice | DestinationsSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Brand name field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.brand_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	brand_name: prismic.KeyTextField;
	
	/**
	 * Brand subtitle field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.brand_subtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	brand_subtitle: prismic.KeyTextField;
	
	/**
	 * Tagline field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.tagline
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tagline: prismic.KeyTextField;
	
	/**
	 * Phone number field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.phone
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phone: prismic.KeyTextField;
	
	/**
	 * Email address field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.email
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
	
	/**
	 * Logo field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Nav button text field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.nav_button_label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	nav_button_label: prismic.KeyTextField;
	
	/**
	 * Business name (footer) field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.legal_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	legal_name: prismic.KeyTextField;
	
	/**
	 * Photo credits field in *Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.photo_credits
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	photo_credits: prismic.RichTextField;
	
	/**
	 * Site by (name) field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.site_by_label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_by_label: prismic.KeyTextField;
	
	/**
	 * Site by (link) field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.site_by_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	site_by_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = HomepageDocument | SettingsDocument;

/**
 * Item in *Destinations → Default → Primary → Destination tiles*
 */
export interface DestinationsSliceDefaultPrimaryTilesItem {
	/**
	 * Small label field in *Destinations → Default → Primary → Destination tiles*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.tiles[].small_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	small_label: prismic.KeyTextField;
	
	/**
	 * Title field in *Destinations → Default → Primary → Destination tiles*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.tiles[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Destinations → Default → Primary → Destination tiles*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.tiles[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
	
	/**
	 * Photo field in *Destinations → Default → Primary → Destination tiles*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.tiles[].photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * Tile size field in *Destinations → Default → Primary → Destination tiles*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.tiles[].size
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	size: prismic.SelectField<"big" | "normal" | "wide">;
}

/**
 * Primary content in *Destinations → Default → Primary*
 */
export interface DestinationsSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Destinations → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Title (italic = coral word) field in *Destinations → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Intro text field in *Destinations → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.lead
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	lead: prismic.RichTextField;
	
	/**
	 * Destination tiles field in *Destinations → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.tiles[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	tiles: prismic.GroupField<Simplify<DestinationsSliceDefaultPrimaryTilesItem>>;
	
	/**
	 * Photo note (small text under tiles) field in *Destinations → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: destinations.default.primary.photo_note
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	photo_note: prismic.KeyTextField;
}

/**
 * Default variation for Destinations Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DestinationsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<DestinationsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Destinations*
 */
type DestinationsSliceVariation = DestinationsSliceDefault

/**
 * Destinations Shared Slice
 *
 * - **API ID**: `destinations`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DestinationsSlice = prismic.SharedSlice<"destinations", DestinationsSliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Small heading above the title field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline (italic = orange word, bold = blue word) field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	headline: prismic.RichTextField;
	
	/**
	 * Intro text field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.subtext
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subtext: prismic.KeyTextField;
	
	/**
	 * Main button text field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.primary_button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	primary_button_label: prismic.KeyTextField;
	
	/**
	 * Second button text field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.secondary_button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	secondary_button_label: prismic.KeyTextField;
	
	/**
	 * Callout (bold part) field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.hook_bold
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hook_bold: prismic.KeyTextField;
	
	/**
	 * Callout (rest of sentence) field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.hook_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hook_text: prismic.KeyTextField;
	
	/**
	 * Portrait photo field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.portrait
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	portrait: prismic.ImageField<never>;
	
	/**
	 * Badge title field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.badge_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_title: prismic.KeyTextField;
	
	/**
	 * Badge subtitle field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.badge_subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_subtitle: prismic.KeyTextField;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *Ribbon → Default → Primary → Keywords*
 */
export interface RibbonSliceDefaultPrimaryKeywordsItem {
	/**
	 * Keyword field in *Ribbon → Default → Primary → Keywords*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: ribbon.default.primary.keywords[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *Ribbon → Default → Primary*
 */
export interface RibbonSliceDefaultPrimary {
	/**
	 * Keywords field in *Ribbon → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: ribbon.default.primary.keywords[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	keywords: prismic.GroupField<Simplify<RibbonSliceDefaultPrimaryKeywordsItem>>;
}

/**
 * Default variation for Ribbon Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RibbonSliceDefault = prismic.SharedSliceVariation<"default", Simplify<RibbonSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Ribbon*
 */
type RibbonSliceVariation = RibbonSliceDefault

/**
 * Ribbon Shared Slice
 *
 * - **API ID**: `ribbon`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RibbonSlice = prismic.SharedSlice<"ribbon", RibbonSliceVariation>;

/**
 * Item in *Services → Default → Primary → Service cards*
 */
export interface ServicesSliceDefaultPrimaryCardsItem {
	/**
	 * Icon field in *Services → Default → Primary → Service cards*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.cards[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"cruise" | "plane" | "resort" | "group" | "compass" | "star" | "hotel" | "pin">;
	
	/**
	 * Card title field in *Services → Default → Primary → Service cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.cards[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Card description field in *Services → Default → Primary → Service cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.cards[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
}

/**
 * Primary content in *Services → Default → Primary*
 */
export interface ServicesSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Title (italic = coral word) field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Intro text field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.lead
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	lead: prismic.RichTextField;
	
	/**
	 * Service cards field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.cards[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	cards: prismic.GroupField<Simplify<ServicesSliceDefaultPrimaryCardsItem>>;
	
	/**
	 * Callout heading (italic = highlight) field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.callout_heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	callout_heading: prismic.RichTextField;
	
	/**
	 * Callout button label field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.callout_button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	callout_button_label: prismic.KeyTextField;
}

/**
 * Default variation for Services Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServicesSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ServicesSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Services*
 */
type ServicesSliceVariation = ServicesSliceDefault

/**
 * Services Shared Slice
 *
 * - **API ID**: `services`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServicesSlice = prismic.SharedSlice<"services", ServicesSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			AllDocumentTypes,
			DestinationsSlice,
			DestinationsSliceDefaultPrimaryTilesItem,
			DestinationsSliceDefaultPrimary,
			DestinationsSliceVariation,
			DestinationsSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			RibbonSlice,
			RibbonSliceDefaultPrimaryKeywordsItem,
			RibbonSliceDefaultPrimary,
			RibbonSliceVariation,
			RibbonSliceDefault,
			ServicesSlice,
			ServicesSliceDefaultPrimaryCardsItem,
			ServicesSliceDefaultPrimary,
			ServicesSliceVariation,
			ServicesSliceDefault
		}
	}
}
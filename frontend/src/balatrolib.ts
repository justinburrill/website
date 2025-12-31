import { useTemplateRef } from "vue";

type Modifier = { (chips: number, mult: number): [number, number] };
export type HandName = "high_card" | "pair" | "two_pair" | "three_of_a_kind" | "straight" | "flush" | "full_house" | "four_of_a_kind" | "straight_flush";
export interface HandValues {
    base: [number, number],
    per_level: [number, number],
}


export const hands: Record<HandName, HandValues> = {
    // CHIPS, MULT
    "high_card": { "base": [5, 1], "per_level": [+10, +1] },
    "pair": { "base": [10, 2], "per_level": [+15, +1] },
    "two_pair": { "base": [20, 2], "per_level": [+20, +1] },
    "three_of_a_kind": { "base": [30, 3], "per_level": [+20, +2] },
    "straight": { "base": [30, 4], "per_level": [+30, +3] },
    "flush": { "base": [35, 4], "per_level": [+15, +2] },
    "full_house": { "base": [40, 4], "per_level": [+25, +2] },
    "four_of_a_kind": { "base": [60, 7], "per_level": [+30, +3] },
    "straight_flush": { "base": [100, 8], "per_level": [+40, +4] },
}

function card_value(card: string): number {
    try {
        let val = parseInt(card);
        if ((val >= 2) && (val <= 10)) {
            return val;
        }
    }
    catch (_) { ; }
    if (["K", "Q", "J"].includes(card)) {
        return 10;
    } else if (card == "A") {
        return 11;
    } else {
        return -1;
    }

}

function text_to_value_modifier(text: string): Modifier | null {
    if (
        !(text.includes("m") || text.includes("c")) ||
        !(text.includes("*") || text.includes("+") || text.includes("-"))
    ) {
        console.error(`Invalid modifier text: '${text}'`);
        return null;
    }
    const sign: number = text.includes("-") ? -1 : 1;
    const is_mult_modifier: boolean = (text.includes("m")); // affecting multiplier and not chips
    const multiplying: boolean = text.includes("*"); // add or multiply the value we are affecting
    let value_text: string = "";
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        if (!isNaN(parseInt(char))) {
            value_text += char;
        }
    }
    if (value_text.length == 0) {
        console.error(`Invalid modifier value: '${value_text}'`);
        return null;
    }
    const value: number = parseInt(value_text);

    const identity: number = multiplying ? 1 : 0;
    const out: [number, number] = is_mult_modifier ? [identity, value] : [value, identity];

    return (chips, mult) => {
        if (multiplying) {
            return [chips * out[0], mult * out[1]];
        }
        else {
            if (sign > 0) {
                return [chips + out[0], mult + out[1]];
            }
            else {
                return [chips - out[0], mult - out[1]];
            }
        }
    };
}

function parse_bonus_text(text: string): (Modifier | null)[] | null {
    if (text.trim().length == 0) { return null; }
    const words = text.split(",").map((s: string) => s.trim());
    if (words.length == 0) { return null; }

    const modifiers = words.map(text_to_value_modifier);
    return modifiers;
}

export function calculate_total(hand_name: HandName, hand_level: number, held_in_hand_bonus_input: HTMLInputElement | null, joker_bonus_input: HTMLInputElement | null, card_bonus_input: HTMLInputElement | null): number {
    if (!(held_in_hand_bonus_input && joker_bonus_input && card_bonus_input)) {
        console.error(`error calculating total for ${hand_name}, input field was null`);
        return -1;
    }
    const held_in_hand_bonus_text: string = held_in_hand_bonus_input.value;
    const joker_bonus_text: string = joker_bonus_input.value;
    const card_bonus_text: string = card_bonus_input.value;
    // const cards_input_text: string = cards_input?.value;
    // const cards = cards_input_text.split(",").map((c: string) => card_value(c));
    // const card_values = cards.reduce((acc, current) => acc + current, 0);
    const held_in_hand_bonuses = parse_bonus_text(held_in_hand_bonus_text);
    const joker_bonuses = parse_bonus_text(joker_bonus_text);
    const card_bonuses = parse_bonus_text(card_bonus_text);
    // 1. base hand value
    let [chips, mult] = hands[hand_name].base;
    for (let i = 0; i < hand_level; i++) {
        const [dchips, dmult] = hands[hand_name].per_level;
        [chips, mult] = [chips + dchips, mult + dmult];
    }
    // 2. score played cards
    // not gonna do this probably

    // 3. held-in-hand card bonuses
    // 4. joker bonuses
    for (const bonus_list of [card_bonuses, held_in_hand_bonuses, joker_bonuses]) {
        if (bonus_list == null) { continue; }
        for (const modifier of bonus_list) {
            if (modifier == null) {
                console.error("null modifier from a bonus list")
                continue;
            } else {
                [chips, mult] = modifier(chips, mult);
            }
        }
    }

    return chips * mult;
}

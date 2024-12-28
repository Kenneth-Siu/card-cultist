import MythosFace from "../../card/cardFaces/MythosFace/MythosFace";
import PlayerFace from "../../card/cardFaces/PlayerFace/PlayerFace";
import { getTtsDimensions } from "./TtsHelperFunctions";
import path from "path";

export default function getTtsSaveObject(campaignPath, cardSet, cardIndexesToUse, frontImageName, backImageName, isLandscape) {

    const deck = JSON.parse(JSON.stringify(deckTemplate));
    deck.CustomDeck = getCustomDeck(cardIndexesToUse, campaignPath, cardSet, frontImageName, backImageName);


    cardIndexesToUse.forEach(cardIndex => {
        const card = cardSet.cards[cardIndex];
        const ttsCard = getCard(card.getTitle(), campaignPath, cardSet, frontImageName, backImageName, cardIndexesToUse, cardIndex, isLandscape);
        for (let i = 0; i < card.numOfCopies; i++) {
            deck.ObjectStates[0].DeckIDs.push(ttsCard.CardID);
            deck.ObjectStates[0].ContainedObjects.push(ttsCard);
        }
    });
    deck.ObjectStates[0].SidewaysCard = isLandscape;
    deck.ObjectStates[0].DeckIDs.reverse();
    deck.ObjectStates[0].ContainedObjects.reverse();
    return deck;
}

function getCard(cardName, campaignPath, cardSet, frontImageName, backImageName, cardIndexesToUse, cardIndex, isLandscape) {
    const card = JSON.parse(JSON.stringify(cardTemplate));
    card.NickName = cardName;
    card.CardID = (88000 + cardSet.id + (isLandscape ? 1000 : 0)) * 100 + cardIndexesToUse.indexOf(cardIndex);
    card.CustomDeck = getCustomDeck(cardIndexesToUse, campaignPath, cardSet, frontImageName, backImageName, isLandscape);
    card.SidewaysCard = isLandscape;
    return card;
}

function getCustomDeck(cardIndexesToUse, campaignPath, cardSet, frontImageName, backImageName, isLandscape) {
    const singleCardBack = getSingleCardBackIfRelevant(cardSet, cardIndexesToUse);

    const [numberOfColumns, numberOfRows] = getTtsDimensions(cardIndexesToUse.length);
    const normalizedCampaignPath = path.normalize(campaignPath);
    const campaignFolder = normalizedCampaignPath.substring(0, normalizedCampaignPath.lastIndexOf("\\"));
    const returnedObject = {};
    returnedObject[88000 + cardSet.id + (isLandscape ? 1000 : 0)] = {
        "FaceURL": `file:///${campaignFolder}\\Exports\\${cardSet.getTitle()}\\${frontImageName}`,
        "BackURL": singleCardBack || `file:///${campaignFolder}\\Exports\\${cardSet.getTitle()}\\${backImageName}`,
        "NumWidth": numberOfColumns,
        "NumHeight": numberOfRows,
        "BackIsHidden": true,
        "UniqueBack": !singleCardBack,
        "Type": 0
    }
    return returnedObject;
}

function getSingleCardBackIfRelevant(cardSet, cardIndexesToUse) {
    const cards = cardSet.cards.filter((card, index) => cardIndexesToUse.includes(index))
    if (cards.every(card => card.backFace?.type === MythosFace.type)) {
        return "https://steamusercontent-a.akamaihd.net/ugc/2342503777940351785/F64D8EFB75A9E15446D24343DA0A6EEF5B3E43DB/";
    }
    if (cards.every(card => card.backFace?.type === PlayerFace.type)) {
        return "https://steamusercontent-a.akamaihd.net/ugc/2342503777940352139/A2D42E7E5C43D045D72CE5CFC907E4F886C8C690/";
    }
    return null;
}

const cardTemplate = {
    "Name": "Card",
    "Transform": {
        "posX": 0,
        "posY": 0,
        "posZ": 0,
        "rotX": 0,
        "rotY": 270,
        "rotZ": 0,
        "scaleX": 1.0,
        "scaleY": 1.0,
        "scaleZ": 1.0
    },
    "Nickname": null,
    "Description": "",
    "GMNotes": "",
    "AltLookAngle": {
        "x": 0.0,
        "y": 0.0,
        "z": 0.0
    },
    "ColorDiffuse": {
        "r": 0.713235259,
        "g": 0.713235259,
        "b": 0.713235259
    },
    "LayoutGroupSortIndex": 0,
    "Value": 0,
    "Locked": false,
    "Grid": true,
    "Snap": true,
    "IgnoreFoW": false,
    "MeasureMovement": false,
    "DragSelectable": true,
    "Autoraise": true,
    "Sticky": true,
    "Tooltip": true,
    "GridProjection": false,
    "HideWhenFaceDown": true,
    "Hands": true,
    "CardID": null,
    "SidewaysCard": false,
    "CustomDeck": null,
    "LuaScript": "",
    "XmlUI": ""
};

const deckTemplate = {
    "SaveName": "",
    "Date": "",
    "VersionNumber": "",
    "GameMode": "",
    "GameType": "",
    "GameComplexity": "",
    "Tags": [],
    "Gravity": 0.5,
    "PlayArea": 0.5,
    "Table": "",
    "Sky": "",
    "Note": "",
    "TabStates": {},
    "CustomDeck": null,
    "LuaScript": "",
    "LuaScriptState": "",
    "XmlUI": "",
    "ObjectStates": [
        {
            "Name": "Deck",
            "Transform": {
                "posX": 0,
                "posY": 0,
                "posZ": 0,
                "rotX": 0,
                "rotY": 270,
                "rotZ": 0,
                "scaleX": 1.0,
                "scaleY": 1.0,
                "scaleZ": 1.0
            },
            "Nickname": "",
            "Description": "",
            "GMNotes": "",
            "AltLookAngle": {
                "x": 0.0,
                "y": 0.0,
                "z": 0.0
            },
            "ColorDiffuse": {
                "r": 0.713235259,
                "g": 0.713235259,
                "b": 0.713235259
            },
            "LayoutGroupSortIndex": 0,
            "Value": 0,
            "Locked": false,
            "Grid": true,
            "Snap": true,
            "IgnoreFoW": false,
            "MeasureMovement": false,
            "DragSelectable": true,
            "Autoraise": true,
            "Sticky": true,
            "Tooltip": true,
            "GridProjection": false,
            "HideWhenFaceDown": true,
            "Hands": false,
            "SidewaysCard": false,
            "DeckIDs": [],
            "LuaScript": "",
            "LuaScriptState": "",
            "XmlUI": "",
            "ContainedObjects": []
        }
    ]
}
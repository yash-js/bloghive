'use client'

import { type JSONContent } from "novel"
import { useMemo } from "react"
import { generateHTML } from '@tiptap/html'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import TextStyle from '@tiptap/extension-text-style'
import CodeBlock from '@tiptap/extension-code-block'
import BlockQuote from '@tiptap/extension-blockquote'
import Italic from '@tiptap/extension-italic'
import Image from '@tiptap/extension-image'
import ImageExtension from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Bold from '@tiptap/extension-bold'
import HardBreak from '@tiptap/extension-hard-break'
const RenderArticle = ({ json }: { json: JSONContent }) => {
    const output = useMemo(() => {

        return generateHTML(json, [
            Document, Paragraph, Text, Link, Underline, Heading, ListItem, BulletList, Code, BlockQuote, TextStyle, CodeBlock, Italic, Image, ImageExtension,
            HorizontalRule, Bold, HardBreak
        ])
    }, [json])

    return (
        <div className='prose m-auto w-11/12 sm:prose-lg dark:prose-invert sm:w-2/3 prose-li:marker:text-primary' dangerouslySetInnerHTML={{ __html: output }} />
    )
}

export default RenderArticle
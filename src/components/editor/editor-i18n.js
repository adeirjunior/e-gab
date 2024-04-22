export const PT_I18N = {
  /**
   * @type {I18nDictionary}
   */
  messages: {
    /**
     * Other below: translation of different UI components of the editor.js core
     */
    ui: {
      blockTunes: {
        toggler: {
          "Click to tune": "Clique para ajustar",
          "or drag to move": "ou arraste para mover",
        },
      },
      inlineToolbar: {
        converter: {
          "Convert to": "Converter para",
        },
      },
      toolbar: {
        toolbox: {
          Add: "Adicionar",
        },
      },
    },

    /**
     * Section for translation Tool Names: both block and inline tools
     */
    toolNames: {
      Text: "Texto",
      Heading: "Título",
      List: "Lista",
      Warning: "Aviso",
      Checklist: "Lista de Verificação",
      Quote: "Citação",
      Code: "Código",
      Delimiter: "Delimitador",
      "Raw HTML": "HTML Bruto",
      Table: "Tabela",
      Link: "Link",
      Marker: "Marcador",
      Bold: "Negrito",
      Italic: "Itálico",
      InlineCode: "Código em Linha",
      Image: "Imagem",
    },

    /**
     * Section for passing translations to the external tools classes
     */
    tools: {
      /**
       * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
       * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
       */
      warning: {
        // <-- 'Warning' tool will accept this dictionary section
        Title: "Título",
        Message: "Mensagem",
      },

      /**
       * Link is the internal Inline Tool
       */
      link: {
        "Add a link": "Adicionar um link",
      },
      /**
       * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
       */
      stub: {
        "The block cannot be displayed correctly.":
          "O bloco não pode ser exibido corretamente.",
      },
    },

    /**
     * Section allows to translate Block Tunes
     */
    blockTunes: {
      /**
       * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
       * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
       *
       * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
       */
      delete: {
        Delete: "Excluir",
      },
      moveUp: {
        "Move up": "Mover para cima",
      },
      moveDown: {
        "Move down": "Mover para baixo",
      },
    },
  },
};

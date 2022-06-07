<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LetterSent extends Mailable
{
    use Queueable, SerializesModels;

    public $letter;

    /**
     * Create a new message instance.
     * @param  $letter
     * @return void     
     * */
    public function __construct($letter)
    {
        $this->letter = $letter;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {   
        $subject = 'Litera incarcata';
        $message = '<h1>'.$this->letter->dictionary_name.'</h1><div data-dictionary-id="'.$this->letter->dictionary_id.'">'.$this->letter->letter.'</div>';
        return $this->html($message)->subject($subject)->attachData($message, "Litera.html");;
    }
}

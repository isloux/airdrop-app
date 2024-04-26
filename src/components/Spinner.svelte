<script>
    // No script needed for this simple spinner
   </script>
   
   <style>
    .spinner-container {
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
       z-index: 9999; /* Ensure the spinner is above other content */
       background: rgba(255, 255, 255, 0.75); /* Optional: Add a semi-transparent background */
    }
   
    .spinner {
       border: 8px solid rgba(0, 0, 0, 0.1);
       width: 40px;
       height: 40px;
       border-radius: 50%;
       border-left-color: #09f;
       animation: spin 1s ease infinite;
    }
   
    @keyframes spin {
       0% {
         transform: rotate(0deg);
       }
       100% {
         transform: rotate(360deg);
       }
    }
   </style>
   
   <div class="spinner-container">
       <div class="spinner"></div>
   </div>
   